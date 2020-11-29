import styled from "@emotion/styled";

export default styled.article<{ room?: boolean }>`
  margin: ${({ room }) => (room ? "0" : "0 auto")};
  align-content: center;
  grid-area: "main";
  max-width: 633px;
  display: grid;
  gap: 1rem;
`;
