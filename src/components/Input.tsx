import styled from "@emotion/styled";

export default styled.input`
  border: 1px solid ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bg};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: 0.25s ease;
  margin: 0;
  &:hover {
    border: 1px solid ${(props) => props.theme.secondary};
  }
`;
