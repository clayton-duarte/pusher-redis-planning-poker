import React, { FunctionComponent, MouseEvent } from "react";
import styled from "@emotion/styled";

import { useRoom } from "../providers/room";
import Button from "./Button";
import Text from "./Text";

const Wrapper = styled.aside`
  align-content: start;
  grid-area: "sidebar";
  display: grid;
  gap: 1rem;
`;

const Sidebar: FunctionComponent = () => {
  const { room, resetVotes, toggleViewVotes } = useRoom();

  return (
    <Wrapper>
      <Text>Room: {room?.id}</Text>
      <Text>Round: {room?.resets}</Text>
    </Wrapper>
  );
};

export default Sidebar;
