import styled from "@emotion/styled";

export default styled.button`
  all: unset;
  border: 1px solid ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.primary};
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: 0.25s ease;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  display: grid;
  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.bg};
  }
  &:disabled {
    filter: grayscale(100%);
    pointer-events: none;
  }
`;
