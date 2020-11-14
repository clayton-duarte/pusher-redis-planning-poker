import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const UserCtx = createContext(null);

export const useUser = () => {
  const [user] = useContext(UserCtx);
  const router = useRouter();

  const createUser = async (username): Promise<void> => {
    await Axios.post<string>("/api/user", { username });
    router.back();
  };

  return { user, createUser };
};

const Provider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<string>("");
  const router = useRouter();

  const getUser = async (): Promise<void> => {
    const { data } = await Axios.get<string>("/api/user");
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
