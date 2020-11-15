import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

import { useRoom } from "../providers/room";
import Text from "./Text";

const SideBarWrapper = styled.aside`
  border: 1px solid ${(props) => props.theme.secondary};
  background: ${(props) => props.theme.bg};
  border-radius: 0.25rem;
  align-content: start;
  grid-area: "sidebar";
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

const EstimateWrapper = styled.div`
  grid-template-columns: auto auto;
  justify-content: space-between;
  display: grid;
`;

const Sidebar: FunctionComponent = () => {
  const { room } = useRoom();

  return (
    <SideBarWrapper>
      <Text primary>🏢 Room: {room?.id}</Text>
      <EstimateWrapper>
        <Text>🧮 Total points:</Text>
        <Text>
          {room?.rounds?.reduce((prev, curr) => prev + Number(curr), 0)}
        </Text>
      </EstimateWrapper>
      {room?.rounds?.map((roundEstimate, index) => (
        <EstimateWrapper key={roundEstimate + index}>
          <Text>🗳️ Round {index + 1}</Text>
          <Text>{roundEstimate}</Text>
        </EstimateWrapper>
      ))}
    </SideBarWrapper>
  );
};

export default Sidebar;
