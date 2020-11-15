import React, { FunctionComponent, MouseEvent } from "react";
import styled from "@emotion/styled";

import { findClosestEstimate } from "../helpers";
import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import { points } from "../enums";
import Button from "./Button";
import Text from "./Text";

const CardWrapper = styled.section`
  grid-template-columns: repeat(10, 1fr);
  justify-content: start;
  display: grid;
  gap: 1rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Card = styled(Button)`
  font-weight: unset;
  padding: 0.25rem;
  min-height: 3ch;
  font-size: 1rem;
`;

const ParticipantTools: FunctionComponent = () => {
  const { room, sendVote } = useRoom();
  const { user } = useUser();

  const isVisible = room?.reveal;
  const alreadyVoted = Boolean(
    room?.members?.find((member) => member.id === user?.id)?.lastVote
  );

  const estimate = findClosestEstimate(room);
  const showEstimate = isVisible && estimate;

  const handleClick = (point: Points) => (e: MouseEvent) => {
    e.preventDefault();
    sendVote(point);
  };

  const renderMessage = () => {
    if (alreadyVoted) {
      if (isVisible) return "Wait for the result";
      return "Wait for the others";
    }
    return "Choose an estimate";
  };

  return (
    <>
      <Text>ℹ️ {renderMessage()}.</Text>
      {showEstimate ? (
        <Text alert="success">
          ⚠️ The suggested estimate for this round is {showEstimate} points!
        </Text>
      ) : (
        <CardWrapper>
          {points.map((point) => (
            <Card
              onClick={handleClick(point)}
              disabled={alreadyVoted}
              key={`card-${point}`}
            >
              {point}
            </Card>
          ))}
        </CardWrapper>
      )}
    </>
  );
};

export default ParticipantTools;
