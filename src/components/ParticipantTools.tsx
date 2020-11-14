import React, { FunctionComponent, MouseEvent } from "react";
import styled from "@emotion/styled";

import { useRoom } from "../providers/room";
import { points } from "../enums";
import Button from "./Button";

const CardWrapper = styled.section`
  grid-template-columns: repeat(5, auto);
  justify-content: start;
  display: grid;
  gap: 1rem;
`;

const Card = styled(Button)`
  font-weight: unset;
  padding: 0.25rem;
  min-height: 3ch;
  font-size: 1rem;
  min-width: 3ch;
`;

const ParticipantTools: FunctionComponent = () => {
  const { sendVote } = useRoom();

  const handleClick = (point: Points) => (e: MouseEvent) => {
    e.preventDefault();
    sendVote(point);
  };

  return (
    <>
      <CardWrapper>
        {points.map((point) => (
          <Card key={`card-${point}`} onClick={handleClick(point)}>
            {point}
          </Card>
        ))}
      </CardWrapper>
    </>
  );
};

export default ParticipantTools;
