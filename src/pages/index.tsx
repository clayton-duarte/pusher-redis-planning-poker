import React from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import LoadingPage from "../components/LoadingPage";
import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Button from "../components/Button";
import Text from "../components/Text";
import Main from "../components/Main";

const Row = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  gap: 1rem;
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;

const HomePage: NextPage = () => {
  const { loading, user, signOut } = useUser();
  const { createRoom } = useRoom();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (loading) return <LoadingPage />;
  if (!user) return null;

  return (
    <Main>
      <Text primary caps>
        Welcome {user?.name}!
      </Text>
      <Text>Please choose one of the actions bellow:</Text>
      <Row>
        <Button disabled={!user} onClick={createRoom}>
          ✨ create a room
        </Button>
        <Button onClick={handleSignOut}>🔑 sign out</Button>
      </Row>
      <Text alert="success">When you create a new room you are the host!</Text>
    </Main>
  );
};

export default HomePage;
