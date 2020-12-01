import React, { FunctionComponent, MouseEvent, useState } from "react";
import styled from "@emotion/styled";

import { allParticipantsVoted, getOnlyParticipants } from "../helpers";
import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Button from "./Button";
import Modal from "./Modal";
import Text from "./Text";
import Row from "./Row";

const List = styled.ul`
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  display: grid;
  gap: 0.5rem;
  margin: 0;
`;

const ListItem = styled.li`
  grid-template-columns: auto 1fr auto;
  justify-content: space-between;
  text-transform: capitalize;
  list-style-type: none;
  align-items: center;
  position: relative;
  display: grid;
  margin: 0;
  gap: 1rem;
`;

const Pointer = styled.div`
  @keyframes point {
    from {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0.5rem, 0);
    }
    to {
      transform: translate(0, 0);
    }
  }
  animation: point 1s ease infinite;
  display: inline-block;
`;

const Kicker = styled(Text)`
  cursor: pointer;
`;

const Vote = styled(Text)`
  text-align: center;
`;

const ParticipantList: FunctionComponent = () => {
  const [kickingMember, setKickingMember] = useState<string>();
  const { room, kickMember } = useRoom();
  const { user } = useUser();

  const userIsHost = user?.email === room?.host?.email;
  const onlyParticipants = getOnlyParticipants(room);
  const allVoted = allParticipantsVoted(room);

  if (!onlyParticipants.length) {
    return (
      <Text alert="error">
        There are no participants yet.
        <br />
        Please share this room link with your team.
      </Text>
    );
  }

  const handleKickMember = (memberEmail) => (e: MouseEvent) => {
    setKickingMember(memberEmail);
  };

  const handleConfirmKickMember = () => {
    kickMember(kickingMember);
    setKickingMember(undefined);
  };

  const handleCancelKickMember = () => {
    setKickingMember(undefined);
  };

  return (
    <List>
      {onlyParticipants.map(
        ({ name: memberName, email: memberEmail, lastVote }) => {
          const memberIsMe = memberEmail === user?.email;

          const renderIcon = () => {
            if (userIsHost) {
              return (
                <Kicker onClick={handleKickMember(memberEmail)}>🦶</Kicker>
              );
            }
            if (memberIsMe) {
              return <Pointer>👉</Pointer>;
            }
            return <Text>👤</Text>;
          };

          const renderVote = () => {
            const canViewVote = memberIsMe || room?.reveal || allVoted;
            const voted = Boolean(lastVote);
            if (voted) {
              if (canViewVote) return lastVote;
              return "✅";
            }
            return "⏳";
          };

          return (
            <ListItem key={memberEmail}>
              {renderIcon()}
              <Text caps>{memberName}</Text>
              <Vote>{renderVote()}</Vote>
            </ListItem>
          );
        }
      )}
      <Modal open={Boolean(kickingMember)} onCancel={handleCancelKickMember}>
        <Text primary>Are you sure?</Text>
        <Text>
          This action will try to remove the user from this room.
          <br />
          Only offline users can be removed that way.
          <br />
          Online users will join the room again automatically.
        </Text>
        <Row cols={2}>
          <Button onClick={handleCancelKickMember} secondary>
            cancel
          </Button>
          <Button onClick={handleConfirmKickMember}>confirm</Button>
        </Row>
      </Modal>
    </List>
  );
};

export default ParticipantList;
