import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import Axios from "axios";
import { useRouter } from "next/router";

const RoomCtx = createContext(null);

export const useRoom = () => {
  const [room, setRoom] = useContext(RoomCtx);
  const router = useRouter();

  const roomId = String(router.query.room || "");

  const createRoomId = (): string => {
    const timestamp = new Date().getTime().toString(16);
    const random = Math.random().toString(16).slice(2);
    return `${timestamp}-${random}`;
  };

  const getRoom = async (roomId): Promise<void> => {
    const { data } = await Axios.get(`/api/${roomId}`);
    return setRoom(data);
  };

  const putRoom = async (roomId, body): Promise<void> => {
    const { data } = await Axios.put(`/api/${roomId}`, body);
    return setRoom(data);
  };

  const createRoom = async (): Promise<boolean> => {
    const newRoomId = createRoomId();
    await putRoom(newRoomId, {});
    return router.push(`/${newRoomId}`);
  };

  useEffect(() => {
    if (roomId) {
      getRoom(roomId);
    }
  }, [roomId]);

  return { room, roomId, createRoom, getRoom, putRoom };
};

const Provider: FunctionComponent = ({ children }) => {
  return <RoomCtx.Provider value={useState({})}>{children}</RoomCtx.Provider>;
};

export default Provider;
