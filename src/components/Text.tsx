import styled from "@emotion/styled";

interface TextProps {
  primary?: boolean;
  secondary?: boolean;
  bold?: boolean;
}

export default styled.p<TextProps>`
  color: ${({ theme, primary, secondary }) =>
    primary ? theme.primary : secondary ? theme.secondary : "inherit"};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  text-transform: capitalize;
  position: relative;
  margin: 0;
`;
