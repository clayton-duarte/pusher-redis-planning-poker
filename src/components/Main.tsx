import styled from "@emotion/styled";

export default styled.article<{ room?: boolean }>`
  margin: ${({ room }) => (room ? "0" : "0 auto")};
  align-content: center;
  max-width: 633px;
  grid-area: main;
  display: grid;
  gap: 1rem;
`;
