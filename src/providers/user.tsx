import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const UserCtx = createContext<[User, Dispatch<User>]>(null);

export const useUser = () => {
  const [user, setUser] = useContext(UserCtx);
  const router = useRouter();

  const createUser = async (username): Promise<void> => {
    const { data } = await Axios.post<User>("/api/user", { username });
    setUser(data);
    router.back();
  };

  const deleteUser = async (): Promise<void> => {
    await Axios.delete<"OK">("/api/user");
    setUser(null);
  };

  return { user, createUser, deleteUser };
};

const Provider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const getUser = async (): Promise<void> => {
    const { data } = await Axios.get<User>("/api/user");
    if (data) {
      return setUser(data);
    } else {
      router.push("/user");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  return (
    <UserCtx.Provider value={[user, setUser]}>{children}</UserCtx.Provider>
  );
};

export default Provider;
