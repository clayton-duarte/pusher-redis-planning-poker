import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Text from "./Text";

const List = styled.ul`
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  display: grid;
  gap: 0.5rem;
  margin: 0;
`;

const ListItem = styled.li`
  grid-template-columns: auto auto;
  justify-content: space-between;
  text-transform: capitalize;
  list-style-type: none;
  align-items: center;
  position: relative;
  display: grid;
  margin: 0;
`;

const ParticipantList: FunctionComponent = () => {
  const { room } = useRoom();
  const { user } = useUser();

  if (room?.members?.length < 2) return null;

  return (
    <List>
      {room?.members?.map(({ name: memberName, id: memberId, lastVote }) => {
        const isHost = memberId === room?.host?.id;
        const isMe = memberId === user?.id;

        if (isHost) return null;

        const renderVote = () => {
          const canViewVote = isMe || room?.reveal;
          const voted = Boolean(lastVote);
          if (voted) {
            if (canViewVote) return <Text>{lastVote}</Text>;
            return <Text>✅</Text>;
          }
          return <Text>⏳</Text>;
        };

        return (
          <ListItem key={memberId}>
            <Text>
              👤 {memberName}
              {isMe && <span title="you"> ✋</span>}
            </Text>
            {renderVote()}
          </ListItem>
        );
      })}
    </List>
  );
};

export default ParticipantList;
