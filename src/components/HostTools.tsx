import React, { FunctionComponent, MouseEvent, useState } from "react";
import styled from "@emotion/styled";

import { findClosestEstimate } from "../helpers";
import { useRoom } from "../providers/room";
import Button from "./Button";
import Modal from "./Modal";
import Text from "./Text";

const Wrapper = styled.div`
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  gap: 1rem;
`;

const Row = styled.div`
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  gap: 1rem;
`;

const HostTools: FunctionComponent = () => {
  const { room, acceptVote, toggleViewVotes, resetRound } = useRoom();
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const isVisible = room?.reveal;
  const onlyParticipants = room?.members?.filter(
    (member) => member.id !== room.host.id
  );
  const allVoted = onlyParticipants?.reduce(
    (prev, { lastVote }) => prev && Boolean(lastVote),
    Boolean(onlyParticipants?.length)
  );
  const estimate = findClosestEstimate(room);
  const showEstimate = isVisible && estimate;

  const handleClickReset = (e: MouseEvent) => {
    e.preventDefault();
    setIsResetting(true);
  };

  const handleCancelReset = () => {
    setIsResetting(false);
  };
  const handleConfirmReset = () => {
    setIsResetting(false);
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

  const renderMessage = () => {
    if (isVisible) return "Please accept this estimate or restart round";
    if (allVoted) return "It's time to reveal the estimates";
    return "Waiting for the participants to vote";
  };

  return (
    <>
      {showEstimate && (
        <Text alert="success">
          ⚠️ The suggested estimate for this round is {showEstimate} points!
        </Text>
      )}
      <Text>ℹ️ {renderMessage()}.</Text>
      <Wrapper>
        <Button secondary onClick={handleClickReset}>
          👎 restart round
        </Button>
        <Button pulse={allVoted && !isVisible} onClick={handleClickReview}>
          {isVisible ? "🔒 hide" : "🔓 reveal"}
        </Button>
        <Button
          onClick={handleClickAccept}
          disabled={!isVisible}
          pulse={isVisible}
        >
          👍 accept {showEstimate}
        </Button>
        <Modal open={isResetting} onCancel={handleCancelReset}>
          <Text primary>Are you sure you want to restart the round?</Text>
          <Text>
            This action will erase all the votes from the participants.
          </Text>
          <Row>
            <Button secondary onClick={handleCancelReset}>
              cancel
            </Button>
            <Button onClick={handleConfirmReset}>confirm</Button>
          </Row>
        </Modal>
      </Wrapper>
    </>
  );
};

export default HostTools;
