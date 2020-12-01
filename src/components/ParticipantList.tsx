import React, { FunctionComponent, MouseEvent, useState } from "react";
import styled from "@emotion/styled";

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

const AmperSand = styled(Text)`
  @keyframes rotate180 {
    from {
      transform: rotate(-180deg);
    }
    25% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  animation: rotate180 2s ease infinite;
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

const ParticipantList: FunctionComponent = () => {
  const [kickingMember, setKickingMember] = useState<string>();
  const { room, kickMember } = useRoom();
  const { user } = useUser();

  if (room?.members?.length < 2) {
    return (
      <Text alert="error">
        There are no participants yet.
        <br />
        Please share this room link with your team.
      </Text>
    );
  }

  const userIsHost = user?.email === room?.host?.email;

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
      {room?.members?.map(
        ({ name: memberName, email: memberEmail, lastVote }) => {
          const memberIsHost = memberEmail === room?.host?.email;
          const memberIsMe = memberEmail === user?.email;

          if (memberIsHost) return null;

          const renderIcon = () => {
            if (userIsHost)
              return (
                <Kicker onClick={handleKickMember(memberEmail)}>🦶</Kicker>
              );
            if (memberIsMe) return <Pointer>👉</Pointer>;
            return <Text>👤</Text>;
          };

          const renderVote = () => {
            const canViewVote = memberIsMe || room?.reveal;
            const voted = Boolean(lastVote);
            if (voted) {
              if (canViewVote) return <Text>{lastVote}</Text>;
              return <Text>✅</Text>;
            }
            return <AmperSand>⏳</AmperSand>;
          };

          return (
            <ListItem key={memberEmail}>
              {renderIcon()}
              <Text caps>{memberName}</Text>
              {renderVote()}
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
