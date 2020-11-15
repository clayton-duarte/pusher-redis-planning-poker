import styled from "@emotion/styled";

export default styled.button<{ pulse?: boolean; secondary?: boolean }>`
  @keyframes pulse {
    from {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    to {
      transform: scale(1);
    }
  }
  all: unset;
  animation: ${({ pulse }) => (pulse ? "pulse infinite .5s ease" : "none")};
  background: ${({ theme, secondary }) =>
    secondary ? theme.secondary : theme.primary};
  border: 1px solid
    ${({ theme, secondary }) => (secondary ? theme.secondary : theme.primary)};
  color: ${(props) => props.theme.bg};
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: 0.25s ease;
  place-items: center;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  display: grid;
  &:hover {
    background: ${(props) => props.theme.bg};
    color: ${({ theme, secondary }) =>
      secondary ? theme.secondary : theme.primary};
  }
  &:disabled {
    filter: grayscale(100%);
    pointer-events: none;
  }
`;
