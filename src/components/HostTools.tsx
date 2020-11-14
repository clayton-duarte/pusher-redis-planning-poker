import React, { FunctionComponent, MouseEvent } from "react";
import styled from "@emotion/styled";

import { useRoom } from "../providers/room";
import { findClosestEstimate } from "../helpers";
import Button from "./Button";

const Wrapper = styled.div`
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  gap: 1rem;
`;

const HostTools: FunctionComponent = () => {
  const { room, acceptVote, toggleViewVotes, resetRound } = useRoom();
  const isVisible = room?.reveal;

  const estimate = findClosestEstimate(room);

  const handleClickReset = (e: MouseEvent) => {
    e.preventDefault();
    resetRound();
  };

  const handleClickAccept = (e: MouseEvent) => {
    e.preventDefault();
    acceptVote(estimate);
  };

  const handleClickReview = (e: MouseEvent) => {
    e.preventDefault();
    toggleViewVotes(!isVisible);
  };

  return (
    <Wrapper>
      <Button onClick={handleClickReview}>
        👁️ {isVisible ? "hide" : "reveal"}
      </Button>
      <Button disabled={!isVisible} onClick={handleClickAccept}>
        👍 accept {isVisible && estimate}
      </Button>
      <Button onClick={handleClickReset}>🔄 restart round</Button>
    </Wrapper>
  );
};

export default HostTools;
