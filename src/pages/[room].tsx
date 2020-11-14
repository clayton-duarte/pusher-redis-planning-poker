import React from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";

interface TextProps {
  primary?: boolean;
  secondary?: boolean;
  bold?: boolean;
}

const Text = styled.p<TextProps>`
  color: ${({ theme, primary, secondary }) =>
    primary ? theme.primary : secondary ? theme.secondary : "inherit"};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  text-transform: capitalize;
  position: relative;
  margin: 0;
`;

const List = styled.ul`
  margin: 0;
`;

const ListItem = styled.li`
  text-transform: capitalize;
  list-style-type: none;
  position: relative;
  margin: 0;
`;

const RoomPage: NextPage = () => {
  const { room } = useRoom();
  const { user } = useUser();

  return (
    <>
      <Text primary>Room: {room?.id}</Text>
      <Text primary>Participants:</Text>
      <List>
        {room?.members?.map(({ name: memberName, id: memberId }) => (
          <ListItem key={memberId}>
            {memberName}
            {memberId === user?.id && <span title="you"> ✋</span>}
            {memberId === room?.host?.id && <span title="host"> 🕹️</span>}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default RoomPage;
