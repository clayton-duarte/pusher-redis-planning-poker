import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { useSession, signIn, signOut as baseSignOut } from "next-auth/client";
import Axios from "axios";

import LoadingPage from "../components/LoadingPage";

const UserCtx = createContext<{
  setUser: Dispatch<User>;
  loading: boolean;
  user: User;
}>(null);

const Provider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [session, loading] = useSession();

  const postUser = async (user: User): Promise<void> => {
    await Axios.post<User>("/api/user", { user });
    setUser(user);
  };

  useEffect(() => {
    if (!loading) {
      if (session) {
        // SAVE COOKIE
        postUser(session?.user);
      } else {
        // FORCE LOGIN
        signIn("google");
      }
    }
  }, [loading, session]);

  if (loading) return <LoadingPage />;

  return (
    <UserCtx.Provider value={{ loading, user, setUser }}>
      {children}
    </UserCtx.Provider>
  );
};

export const useUser = () => {
  const { loading, user, setUser } = useContext(UserCtx);

  const signOut = async (): Promise<void> => {
    baseSignOut({ callbackUrl: "/" });
    Axios.delete<"OK">("/api/user");
    setUser(undefined);
  };

  return { loading, user, signIn, signOut };
};

export default Provider;
