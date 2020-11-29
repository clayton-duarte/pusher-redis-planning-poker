import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useSession, signIn, signOut } from "next-auth/client";

import LoadingPage from "../components/LoadingPage";

const UserCtx = createContext<{ session; loading }>(null);

const Provider: FunctionComponent = ({ children }) => {
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session) {
      // FORCE LOGIN
      signIn("google");
    }
  }, [loading, session]);

  if (loading) return <LoadingPage />;

  console.log(session?.user);

  return (
    <UserCtx.Provider value={{ session, loading }}>{children}</UserCtx.Provider>
  );
};

export const useUser = () => {
  const { session, loading } = useContext(UserCtx);
  const user = session?.user;

  return { loading, user, signIn, signOut };
};

export default Provider;
