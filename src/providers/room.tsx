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
  const { user, deleteUser } = useUser();
  const [room] = useContext(RoomCtx);
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
    const membersWithoutUser = room.members.filter(
      (member) => member.id !== user.id
    );

    await Axios.put<Room>(`/api/${currentRoom}`, {
      ...room,
      members: membersWithoutUser,
    });
    await deleteUser();
  };

  return { room, createRoom, putRoom, leaveRoom };
};

const Provider: FunctionComponent = ({ children }) => {
  const [room, setRoom] = useState<Room>();
  const { user } = useUser();
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
      return setRoom(data);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  useEffect(() => {
    if (currentRoom) {
      getRoom(currentRoom);
      subscribeToRoom();
    }
  }, [currentRoom]);

  useEffect(() => {
    if (room && user) {
      const isInTheRoom = room?.members?.find(
        ({ id: memberId }) => memberId === user.id
      );

      if (!isInTheRoom) {
        enterIntoRoom();
      }
    }
  }, [room, user]);

  return (
    <RoomCtx.Provider value={[room, setRoom]}>{children}</RoomCtx.Provider>
  );
};

export default Provider;
