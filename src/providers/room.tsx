import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
} from "react";
import Axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import Pusher from "pusher-js";

import LoadingPage from "../components/LoadingPage";
import { useUser } from "./user";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: "us2",
});

const handleAxiosError = ({ response }: AxiosError) => {
  console.log(response);
  // TODO > Real error handling
};

const RoomCtx = createContext<[Room, Dispatch<Room>]>(null);

export const useRoom = () => {
  // SETUP
  const [room] = useContext(RoomCtx);
  const { user } = useUser();
  const router = useRouter();

  const currentRoom = String(router.query.room || "");

  // ACTIONS
  const putRoom = async (body: Room): Promise<void> => {
    try {
      await Axios.put<Room>(`/api/${currentRoom}`, body);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const createRoom = async (): Promise<boolean> => {
    try {
      const { data } = await Axios.post<Room>(`/api/new`, {});
      return router.push(`/${data.id}`);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const leaveRoom = async (): Promise<void> => {
    const filteredMembers = room.members.filter(
      (member) => member.email !== user.email
    );
    const newRoom: Room = {
      ...room,
      members: filteredMembers,
    };
    await router.push("/");
    await putRoom(newRoom);
  };

  const sendVote = async (point: Points) => {
    const updatedMembers = room.members.map((member) => {
      if (member.email === user.email) return { ...member, lastVote: point };
      return member;
    });
    const newRoom: Room = { ...room, members: updatedMembers };
    await putRoom(newRoom);
  };

  const resetRound = async () => {
    const updatedMembers = room.members.map((member) => {
      return { ...member, lastVote: null };
    });
    const newRoom: Room = {
      ...room,
      members: updatedMembers,
      reveal: false,
    };
    await putRoom(newRoom);
  };

  const acceptVote = async (voteAccepted: Points) => {
    const updatedMembers = room.members.map((member) => {
      return { ...member, lastVote: null };
    });
    const newRoom: Room = {
      ...room,
      rounds: room.rounds.concat(voteAccepted),
      members: updatedMembers,
      reveal: false,
    };
    await putRoom(newRoom);
  };

  const toggleViewVotes = async (reveal: boolean) => {
    const newRoom: Room = {
      ...room,
      reveal,
    };
    await putRoom(newRoom);
  };

  const kickMember = async (memberEmail: string) => {
    const filteredMembers = room.members.filter(
      (member) => member.email !== memberEmail
    );
    const newRoom: Room = {
      ...room,
      members: filteredMembers,
    };
    await putRoom(newRoom);
  };

  const makeMemberHost = async (memberEmail: string) => {
    const newHost = room.members.find(({ email }) => email === memberEmail);

    const newRoom: Room = {
      ...room,
      host: newHost,
    };
    await putRoom(newRoom);
  };

  return {
    toggleViewVotes,
    makeMemberHost,
    resetRound,
    createRoom,
    acceptVote,
    kickMember,
    leaveRoom,
    sendVote,
    putRoom,
    room,
  };
};

const Provider: FunctionComponent = ({ children }) => {
  const [room, setRoom] = useState<Room>();
  const { user, loading } = useUser();
  const router = useRouter();

  const currentRoom = String(router.query.room || "");

  const subscribeToRoom = () => {
    const channel = pusher.subscribe(currentRoom);
    channel.bind("update", () => {
      getRoom(currentRoom);
    });
  };

  const enterIntoRoom = async (): Promise<void> => {
    try {
      const membersWithUser = room.members.concat(user);

      await Axios.put<Room>(`/api/${currentRoom}`, {
        ...room,
        members: membersWithUser,
      });
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const getRoom = async (roomId): Promise<void> => {
    try {
      const { data } = await Axios.get<Room>(`/api/${roomId}`);
      return setRoom({ ...data });
    } catch (err) {
      handleAxiosError(err);
    }
  };

  useEffect(() => {
    if (!loading && !room && user && currentRoom) {
      getRoom(currentRoom);
      subscribeToRoom();
    }
  }, [loading, currentRoom, user, room]);

  useEffect(() => {
    if (room && user) {
      const isInTheRoom = room?.members?.find(
        (member) => member.email === user.email
      );

      if (!isInTheRoom) {
        enterIntoRoom();
      }
    }
  }, [room, user]);

  if (loading) return <LoadingPage />;
  if (!user) return null;

  return (
    <RoomCtx.Provider value={[room, setRoom]}>{children}</RoomCtx.Provider>
  );
};

export default Provider;
