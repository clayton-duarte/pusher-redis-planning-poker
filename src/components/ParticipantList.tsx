import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";

import { allParticipantsVoted, getOnlyParticipants } from "../helpers";
import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Tooltip from "./Tooltip";
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

const Vote = styled(Text)`
  text-align: center;
`;

const ParticipantList: FunctionComponent = () => {
  const [kickingMember, setKickingMember] = useState<string>();
  const { room, kickMember, makeMemberHost } = useRoom();
  const [makingHost, setMakingHost] = useState<string>();
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

  return (
    <>
      <List>
        {onlyParticipants.map(
          ({ name: memberName, email: memberEmail, lastVote }) => {
            const memberIsMe = memberEmail === user?.email;

            const renderIcon = () => {
              if (userIsHost) {
                return (
                  <Row cols={2}>
                    <Tooltip
                      onClick={() => setKickingMember(memberEmail)}
                      tip="Remove"
                    >
                      ❌
                    </Tooltip>
                    <Tooltip
                      onClick={() => setMakingHost(memberEmail)}
                      tip="Make host"
                    >
                      📢
                    </Tooltip>
                  </Row>
                );
              }
              if (memberIsMe) {
                return (
                  <Tooltip tip="you">
                    <Pointer>👉</Pointer>
                  </Tooltip>
                );
              }
              return <Tooltip tip="team member">👤</Tooltip>;
            };

            const renderVote = () => {
              const canViewVote = memberIsMe || room?.reveal || allVoted;
              const voted = Boolean(lastVote);
              if (voted) {
                if (canViewVote) {
                  if (lastVote === "skip") {
                    return <Tooltip tip="skipped">⏭️</Tooltip>;
                  }
                  return lastVote;
                }
                return <Tooltip tip="voted">✅</Tooltip>;
              }
              return <Tooltip tip="thinking">⏳</Tooltip>;
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
      </List>

      {/* KICK MEMBER MODAL */}
      <Modal
        open={Boolean(kickingMember)}
        onCancel={() => setKickingMember(undefined)}
      >
        <Text primary>Are you sure you want to remove this user?</Text>
        <Text>
          This action will try to remove the user from this room.
          <br />
          Only offline users can be removed that way.
          <br />
          Online users will join the room again automatically.
        </Text>
        <Row cols={2}>
          <Button onClick={() => setKickingMember(undefined)} secondary>
            cancel
          </Button>
          <Button
            onClick={() => {
              setKickingMember(undefined);
              kickMember(makingHost);
            }}
          >
            confirm
          </Button>
        </Row>
      </Modal>

      {/* SETTING HOST MODAL*/}
      <Modal
        open={Boolean(makingHost)}
        onCancel={() => setMakingHost(undefined)}
      >
        <Text primary>
          Are you sure you want to make this user the new host?
        </Text>
        <Text>
          This action will make this user the new host of this room.
          <br />
          As a consequence, you won't be able to manage that room anymore.
        </Text>
        <Row cols={2}>
          <Button onClick={() => setMakingHost(undefined)} secondary>
            cancel
          </Button>
          <Button
            onClick={() => {
              setMakingHost(undefined);
              makeMemberHost(makingHost);
            }}
          >
            confirm
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default ParticipantList;
