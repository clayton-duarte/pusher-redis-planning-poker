import React from "react";
import styled from "@emotion/styled";
import { useSession, signIn, signOut } from "next-auth/client";
import { NextPage } from "next";

import LoadingPage from "../components/LoadingPage";
import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Button from "../components/Button";
import Text from "../components/Text";
import Main from "../components/Main";

const Wrapper = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  gap: 1rem;
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;

const HomePage: NextPage = () => {
  const [session, loading] = useSession();
  const { user, deleteUser } = useUser();
  const { createRoom } = useRoom();

  // if (!user) return <LoadingPage />;

  return (
    <Main>
      <Text primary caps>
        Welcome {user?.name}!
      </Text>
      <Text>Please choose one of the actions bellow:</Text>
      <Wrapper>
        <Button secondary onClick={deleteUser}>
          ✏️ change my name
        </Button>
        <Button onClick={createRoom}>✨ create a room</Button>
        <Button onClick={() => signIn("google")}>🔑 sign In</Button>
        <Button onClick={() => signOut({ callbackUrl: "/" })}>
          🔑 sign out
        </Button>
      </Wrapper>
      <Text alert="success">You will be the host!</Text>
    </Main>
  );
};

export default HomePage;
