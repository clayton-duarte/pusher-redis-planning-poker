import styled from "@emotion/styled";

export default styled.div<{ cols?: number }>`
  grid-template-columns: repeat(${(props) => props.cols || 1}, 1fr);
  display: grid;
  gap: 1rem;
`;
