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

  return { room, currentRoom, createRoom, putRoom };
};

const Provider: FunctionComponent = ({ children }) => {
  const [room, setRoom] = useState<Room>({});
  const router = useRouter();

  const currentRoom = String(router.query.room || "");

  const subscribeToRoom = () => {
    const channel = pusher.subscribe(currentRoom);
    channel.bind("update", () => {
      getRoom(currentRoom);
    });
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

  return (
    <RoomCtx.Provider value={[room, setRoom]}>{children}</RoomCtx.Provider>
  );
};

export default Provider;
