import React, { FunctionComponent, MouseEvent } from "react";
import styled from "@emotion/styled";

import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Text from "./Text";

const List = styled.ul`
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  max-width: 500px;
  display: grid;
  gap: 0.5rem;
  margin: 0;
`;

const ListItem = styled.li`
  grid-template-columns: auto auto;
  justify-content: space-between;
  text-transform: capitalize;
  list-style-type: none;
  position: relative;
  display: grid;
  margin: 0;
`;

const ParticipantList: FunctionComponent = () => {
  const { room } = useRoom();
  const { user } = useUser();

  return (
    <>
      <Text primary>Participants:</Text>
      <List>
        {room?.members?.map(({ name: memberName, id: memberId, lastVote }) => (
          <ListItem key={memberId}>
            <Text>
              {memberName}
              {memberId === user?.id && <span title="you"> ✋</span>}
              {memberId === room?.host?.id && <span title="host"> 🕹️</span>}
            </Text>
            <Text>{lastVote || "?"}</Text>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ParticipantList;
