import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Axios from "axios";

const UserCtx = createContext(null);

export const useUser = () => {
  const [user, setUser] = useContext(UserCtx);

  const getUser = async (): Promise<void> => {
    const { data } = await Axios.get<string>("/api/user");
    return setUser(data);
  };

  const createUser = async (username): Promise<void> => {
    const { data } = await Axios.put<string>("/api/user", username);
    return setUser(data);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return { user, createUser, getUser };
};

const Provider: FunctionComponent = ({ children }) => {
  return <UserCtx.Provider value={useState({})}>{children}</UserCtx.Provider>;
};

export default Provider;
