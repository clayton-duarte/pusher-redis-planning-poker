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

const RoomPage: NextPage = () => {
  const { currentRoom, putRoom } = useRoom();

  return (
    <>
      <Text>Room: {currentRoom}</Text>
      <Button onClick={() => putRoom({ id: "bla" })}>update</Button>
    </>
  );
};

export default RoomPage;
