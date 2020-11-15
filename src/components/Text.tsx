import styled from "@emotion/styled";

interface TextProps {
  alert?: "success" | "error";
  secondary?: boolean;
  primary?: boolean;
  bold?: boolean;
  caps?: boolean;
}

export default styled.p<TextProps>`
  color: ${({ theme, primary, secondary, alert }) =>
    primary
      ? theme.primary
      : secondary
      ? theme.secondary
      : alert
      ? theme[alert]
      : "inherit"};
  text-transform: ${({ caps }) => (caps ? "capitalize" : "inherit")};
  text-align: ${({ alert }) => (alert ? "center" : "inherit")};
  border-radius: ${({ alert }) => (alert ? ".25rem" : "0")};
  padding: ${({ alert }) => (alert ? "1rem" : "0")};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  border: ${({ alert, theme }) =>
    alert ? `1px solid ${theme[alert]}` : "none"};
  position: relative;
  margin: 0;
`;
