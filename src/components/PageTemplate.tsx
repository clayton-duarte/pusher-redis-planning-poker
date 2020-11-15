import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

const Wrapper = styled.main`
  grid-template-areas: "main" "sidebar";
  grid-template-columns: 1fr auto;
  align-items: start;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  padding: 1rem;
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-areas: "main", "sidebar";
    grid-template-columns: 1fr;
  }
`;

const Header = styled.header`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.bg};
  justify-content: center;
  margin-bottom: 1rem;
  padding: 1rem;
  display: grid;
`;

const PageTemplate: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header>🃏 Planning Poker</Header>
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default PageTemplate;
