import React from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";

const Text = styled.p`
  text-transform: capitalize;
  margin: 0;
`;

const Button = styled.button`
  margin: 0;
`;

const HomePage: NextPage = () => {
  const { user, deleteUser } = useUser();
  const { createRoom } = useRoom();

  return (
    <>
      <Text>Hello {user?.name}!</Text>
      <Button onClick={createRoom}>create room</Button>
      <Button onClick={deleteUser}>logout</Button>
    </>
  );
};

export default HomePage;
