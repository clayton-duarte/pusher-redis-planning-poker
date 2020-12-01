import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useSession, signIn, signOut as baseSignOut } from "next-auth/client";
import Axios from "axios";

import LoadingPage from "../components/LoadingPage";

const UserCtx = createContext<[session: { user: User }, loading: boolean]>(
  null
);

const Provider: FunctionComponent = ({ children }) => {
  const [session, loading] = useSession();

  const postUser = async (user: User): Promise<void> => {
    await Axios.post<User>("/api/user", { user });
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
    <UserCtx.Provider value={[session, loading]}>{children}</UserCtx.Provider>
  );
};

export const useUser = () => {
  const [session, loading] = useContext(UserCtx);
  const user = session?.user as User;

  const signOut = async (): Promise<void> => {
    baseSignOut({ callbackUrl: "/" });
    Axios.delete<"OK">("/api/user");
  };

  return { loading, user, signIn, signOut };
};

export default Provider;
