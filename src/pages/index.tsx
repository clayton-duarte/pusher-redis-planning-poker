import React from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import { useRoom } from "../providers/room";

const Text = styled.p`
  margin: 0;
`;

const Button = styled.button`
  margin: 0;
`;

const HomePage: NextPage = () => {
  const { createRoom } = useRoom();

  return (
    <>
      <Text>Cool Styles</Text>
      <Button onClick={createRoom}>create room</Button>
    </>
  );
};

export default HomePage;
