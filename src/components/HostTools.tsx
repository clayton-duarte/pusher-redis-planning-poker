import React, { FunctionComponent, MouseEvent } from "react";
import styled from "@emotion/styled";

import { useRoom } from "../providers/room";
import Button from "./Button";

const Wrapper = styled.div`
  grid-template-columns: auto auto;
  display: grid;
  gap: 1rem;
`;

const HostTools: FunctionComponent = () => {
  const { room, resetVotes, toggleViewVotes } = useRoom();
  const isVisible = room?.reveal;

  const handleClickReset = (e: MouseEvent) => {
    e.preventDefault();
    resetVotes();
  };

  const handleClickReview = (e: MouseEvent) => {
    e.preventDefault();
    toggleViewVotes(!isVisible);
  };

  return (
    <Wrapper>
      <Button onClick={handleClickReview}>
        {isVisible ? "hide" : "reveal"}
      </Button>
      <Button onClick={handleClickReset}>reset</Button>
    </Wrapper>
  );
};

export default HostTools;
