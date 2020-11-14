import styled from "@emotion/styled";

export default styled.main`
  grid-template-areas: "main" "sidebar";
  grid-template-columns: 1fr auto;
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
