import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Axios from "axios";
import { useRouter } from "next/router";

const UserCtx = createContext(null);

export const useUser = () => {
  const [user, setUser] = useContext(UserCtx);
  const router = useRouter();

  const createUser = async (username): Promise<void> => {
    const { data } = await Axios.post<string>("/api/user", { username });
    setUser(data);
    router.back();
  };

  const getUser = async (): Promise<void> => {
    const { data } = await Axios.get<string>("/api/user");
    if (data) {
      return setUser(data);
    }
    router.push("/user");
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  return { user, getUser, createUser };
};

const Provider: FunctionComponent = ({ children }) => {
  return (
    <UserCtx.Provider value={useState<string>("")}>{children}</UserCtx.Provider>
  );
};

export default Provider;
