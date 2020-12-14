import React, { FunctionComponent, MouseEvent } from "react";
import styled from "@emotion/styled";

import { findClosestEstimate, isReadyToEstimate } from "../helpers";
import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import { points } from "../enums";
import Tooltip from "./Tooltip";
import Button from "./Button";
import Text from "./Text";
import Row from "./Row";

const CardWrapper = styled(Row)`
  grid-template-columns: repeat(10, 1fr);
  justify-content: start;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Card = styled(Row)`
  transform-style: preserve-3d;
  perspective: 1000px;
  position: relative;
`;

const CardFilled = styled(Button)`
  background: ${(props) => props.theme.primary};
  backface-visibility: hidden;
  box-shadow: 1px 1px 1px #0009;
  transition: 0.25s ease;
  padding: 1rem 0rem;
  font-weight: unset;
  font-size: 1.2rem;
  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.bg};
    box-shadow: 0.25rem 0.25rem 0.5rem #0009;
    transform: scale(1.1);
  }
  &:disabled {
    transform: rotateY(180deg);
  }
`;

const CardEmpty = styled.span<{ disabled: boolean }>`
  transform: rotateY(${(props) => (props.disabled ? "0" : "-180deg")});
  background: linear-gradient(
        90deg,
        ${(props) => props.theme.primary} 0.125rem,
        transparent 1%
      )
      center,
    linear-gradient(
        0deg,
        ${(props) => props.theme.primary} 0.125rem,
        transparent 1%
      )
      center,
    ${(props) => props.theme.secondary};
  background-size: 0.25rem 0.25rem;
  background-position: 10% 10%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  border-radius: 0.25rem;
  transition: 0.5s ease;
  position: absolute;
  content: "";
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`;

const StyledRow = styled(Row)`
  grid-template-columns: 1fr auto auto;
`;

const ParticipantTools: FunctionComponent = () => {
  const { room, sendVote, leaveRoom } = useRoom();
  const { user } = useUser();

  const isVisible = room?.reveal;
  const alreadyVoted = Boolean(
    room?.members?.find((member) => member.email === user?.email)?.lastVote
  );

  const showEstimate = isReadyToEstimate(room);
  const estimate = findClosestEstimate(room);

  const handleClickVote = (point: Points) => (e: MouseEvent) => {
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
      <StyledRow>
        <Text>ℹ️ {renderMessage()}</Text>
        <Tooltip tip="skip round" onClick={() => sendVote("skip")}>
          ⏭️
        </Tooltip>
        <Tooltip tip="leave room" onClick={leaveRoom}>
          🚪
        </Tooltip>
      </StyledRow>
      {showEstimate ? (
        <Text alert="success">
          ⚠️ The suggested estimate for this round is {estimate} point
          {estimate === "1" ? "" : "s"}!
        </Text>
      ) : (
        <CardWrapper>
          {points.map((point, index) => (
            <Card key={point + index}>
              <CardFilled
                onClick={handleClickVote(point)}
                disabled={alreadyVoted}
                key={`card-${point}`}
              >
                {point}
              </CardFilled>
              <CardEmpty disabled={alreadyVoted} />
            </Card>
          ))}
        </CardWrapper>
      )}
    </>
  );
};

export default ParticipantTools;
