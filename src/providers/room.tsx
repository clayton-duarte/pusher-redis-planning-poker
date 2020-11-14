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

const RoomCtx = createContext<[Room, Dispatch<Room>]>(null);

export const useRoom = () => {
  // SETUP
  const [room, setRoom] = useContext(RoomCtx);
  const router = useRouter();

  const currentRoom = String(router.query.room || "");

  const handleAxiosError = ({ response }: AxiosError) => {
    console.log(response);
    // TODO > Real error handling
  };

  // ACTIONS
  const getRoom = async (roomId): Promise<void> => {
    try {
      const { data } = await Axios.get<Room>(`/api/${roomId}`);
      console.log("getRoom", data);
      return setRoom(data);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const putRoom = async (body: Room): Promise<void> => {
    try {
      const { data } = await Axios.put<Room>(`/api/${currentRoom}`, body);
      return setRoom(data);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const createRoom = async (): Promise<boolean> => {
    try {
      const { data } = await Axios.post<Room>(`/api/new`, {});
      setRoom(data);
      return router.push(`/${data.id}`);
    } catch (err) {
      handleAxiosError(err);
    }
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
  return <RoomCtx.Provider value={useState()}>{children}</RoomCtx.Provider>;
};

export default Provider;
