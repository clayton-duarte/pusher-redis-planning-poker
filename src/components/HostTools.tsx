import React, { FunctionComponent, MouseEvent, useState } from "react";
import styled from "@emotion/styled";

import { findClosestEstimate } from "../helpers";
import { useRoom } from "../providers/room";
import Button from "./Button";
import Modal from "./Modal";
import Text from "./Text";
import Row from "./Row";

const HostTools: FunctionComponent = () => {
  const { room, acceptVote, toggleViewVotes, resetRound } = useRoom();
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const isVisible = room?.reveal;
  const onlyParticipants = room?.members?.filter(
    ({ email: memberEmail }) => memberEmail !== room.host.email
  );
  const allVoted = onlyParticipants?.reduce(
    (prev, { lastVote }) => prev && Boolean(lastVote),
    Boolean(onlyParticipants?.length)
  );
  const noParticipants = onlyParticipants?.length < 1;
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
    if (noParticipants) return "Waiting for the participants to join";
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
      <Text>ℹ️ {renderMessage()}</Text>
      <Row cols={3}>
        <Button secondary onClick={handleClickReset}>
          👎 reset round
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
          <Row cols={2}>
            <Button secondary onClick={handleCancelReset}>
              cancel
            </Button>
            <Button onClick={handleConfirmReset}>confirm</Button>
          </Row>
        </Modal>
      </Row>
    </>
  );
};

export default HostTools;
