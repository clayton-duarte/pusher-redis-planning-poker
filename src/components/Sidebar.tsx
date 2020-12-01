import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

import { useRoom } from "../providers/room";
import Text from "./Text";
import Row from "./Row";

const SideBarWrapper = styled(Row)`
  border: 1px solid ${(props) => props.theme.secondary};
  background: ${(props) => props.theme.bg};
  border-radius: 0.25rem;
  align-content: start;
  grid-area: "sidebar";
  padding: 1rem;
`;

const Wrapper = styled(Row)`
  grid-template-columns: auto auto;
  justify-content: space-between;
`;

const Sidebar: FunctionComponent = () => {
  const { room } = useRoom();

  return (
    <SideBarWrapper>
      <Text primary>🏢 Room: {room?.id}</Text>
      <Wrapper>
        <Text>🧮 Total points:</Text>
        <Text>
          {room?.rounds?.reduce((prev, curr) => prev + Number(curr), 0)}
        </Text>
      </Wrapper>
      {room?.rounds?.map((roundEstimate, index) => (
        <Wrapper key={roundEstimate + index}>
          <Text>🗳️ Round {index + 1}</Text>
          <Text>{roundEstimate}</Text>
        </Wrapper>
      ))}
    </SideBarWrapper>
  );
};

export default Sidebar;
