import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: "us2",
});

const RoomCtx = createContext(null);

export const useRoom = () => {
  const [room, setRoom] = useContext(RoomCtx);
  const router = useRouter();

  const currentRoom = String(router.query.room || "");

  const createRoomId = (): string => {
    const timestamp = new Date().getTime().toString(16);
    const random = Math.random().toString(16).slice(2);
    return `${timestamp}-${random}`;
  };

  const getRoom = async (roomId): Promise<void> => {
    const { data } = await Axios.get(`/api/${roomId}`);
    return setRoom(data);
  };

  const putRoom = async (body, newRoomId?: string): Promise<void> => {
    const { data } = await Axios.put(`/api/${currentRoom || newRoomId}`, body);
    return setRoom(data);
  };

  const createRoom = async (): Promise<boolean> => {
    const newRoomId = currentRoom || createRoomId();
    await putRoom({}, newRoomId);
    return router.push(`/${newRoomId}`);
  };

  useEffect(() => {
    if (currentRoom) {
      getRoom(currentRoom);
      const channel = pusher.subscribe(currentRoom);
      channel.bind("update", () => {
        getRoom(currentRoom);
      });
    }
  }, [currentRoom]);

  return { room, currentRoom, createRoom, getRoom, putRoom };
};

const Provider: FunctionComponent = ({ children }) => {
  return <RoomCtx.Provider value={useState({})}>{children}</RoomCtx.Provider>;
};

export default Provider;
