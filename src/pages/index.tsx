import React from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";

const Text = styled.p`
  margin: 0;
`;

const Button = styled.button`
  margin: 0;
`;

const HomePage: NextPage = () => {
  const { createRoom } = useRoom();
  const { user } = useUser();

  return (
    <>
      <Text>Hello {user}!</Text>
      <Button onClick={createRoom}>create room</Button>
    </>
  );
};

export default HomePage;
