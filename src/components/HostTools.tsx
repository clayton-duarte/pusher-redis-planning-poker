import React, { FunctionComponent, MouseEvent, useState } from "react";

import { useRoom } from "../providers/room";
import Button from "./Button";
import Modal from "./Modal";
import Text from "./Text";
import Row from "./Row";
import {
  allParticipantsVoted,
  findClosestEstimate,
  getOnlyParticipants,
} from "../helpers";

const HostTools: FunctionComponent = () => {
  const { room, acceptVote, toggleViewVotes, resetRound } = useRoom();
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const isVisible = room?.reveal;
  const onlyParticipants = getOnlyParticipants(room);
  const noParticipants = onlyParticipants?.length < 1;
  const allVoted = allParticipantsVoted(room);
  const estimate = findClosestEstimate(room);

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

  const isReadyToEstimate = (): boolean => {
    if (isVisible) return true;
    if (allVoted) return true;
    return false;
  };

  const renderMessage = () => {
    if (noParticipants) return "Waiting for the participants to join";
    if (isVisible) return "Please accept this estimate or restart round";
    if (allVoted) return "It's time to reveal the estimates";
    return "Waiting for the participants to vote";
  };

  const renderReviewButtonText = () => {
    if (isReadyToEstimate()) return "👀 revealed";
    if (isVisible) return "🔒 hide";
    return "🔓 reveal";
  };

  return (
    <>
      {isReadyToEstimate() && (
        <Text alert="success">
          ⚠️ The suggested estimate for this round is {estimate} points!
        </Text>
      )}
      <Text>ℹ️ {renderMessage()}</Text>
      <Row cols={3}>
        <Button secondary onClick={handleClickReset}>
          👎 reset round
        </Button>
        <Button disabled={allVoted} onClick={handleClickReview}>
          {renderReviewButtonText()}
        </Button>
        <Button
          disabled={!isReadyToEstimate()}
          onClick={handleClickAccept}
          pulse={isVisible}
        >
          👍 accept {estimate}
        </Button>

        <Modal open={isResetting} onCancel={handleCancelReset}>
          <Text primary>Are you sure you want to restart the round?</Text>
          <Text>
            This action will erase all the votes from the participants
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
