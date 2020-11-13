import React from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import { useRoom } from "../providers/room";

const Text = styled.p`
  margin: 0;
`;

const RoomPage: NextPage = () => {
  const { roomId } = useRoom();

  return (
    <>
      <Text>Room: {roomId}</Text>
    </>
  );
};

export default RoomPage;
