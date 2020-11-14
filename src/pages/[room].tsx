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

const RoomPage: NextPage = () => {
  const { currentRoom, room, putRoom } = useRoom();
  const { user } = useUser();

  return (
    <>
      <Text>Room: {currentRoom}</Text>
      <Text>
        User: {user} {user === room?.host && "(host)"}
      </Text>
      {/* <Button onClick={() => putRoom({ id: "bla", host: user })}>update</Button> */}
    </>
  );
};

export default RoomPage;
