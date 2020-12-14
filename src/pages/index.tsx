import React from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Button from "../components/Button";
import Text from "../components/Text";
import Main from "../components/Main";
import Row from "../components/Row";

const Wrapper = styled(Row)`
  grid-template-columns: 1fr 1fr;
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;

const HomePage: NextPage = () => {
  const { user, signOut } = useUser();
  const { createRoom } = useRoom();

  return (
    <Main>
      <Text primary caps>
        Welcome {user?.name}!
      </Text>
      <Text>Please choose one of the actions bellow:</Text>
      <Wrapper>
        <Button disabled={!user} onClick={createRoom}>
          ✨ create a room
        </Button>
        <Button onClick={signOut}>🔑 sign out</Button>
      </Wrapper>
      <Text alert="success">When you create a new room you are the host!</Text>
    </Main>
  );
};

export default HomePage;
