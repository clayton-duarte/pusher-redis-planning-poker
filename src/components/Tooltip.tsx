import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

import Text from "./Text";

interface TooltipProps {
  onClick?: () => void;
  tip: string;
}

const StyledText = styled(Text)<TooltipProps>`
  cursor: ${(props) => (props.onClick ? "pointer" : "inherit")};
  position: relative;
  &:hover > #${(props) => props.tip} {
    box-shadow: 0.25rem 0.25rem 0.5rem #0009;
    opacity: 1;
  }
`;

const StyledTooltip = styled.span`
  font-size: calc(0.6 * ${(props) => props.theme.size});
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.bg};
  bottom: calc(0.5rem + 100%);
  text-transform: capitalize;
  box-shadow: 0 0 0 #0009;
  left: calc(50% - 2.5rem);
  filter: grayscale(100%);
  transition: 0.25s ease;
  border-radius: 0.25rem;
  pointer-events: none;
  text-align: center;
  position: absolute;
  padding: 0.25rem;
  width: 5rem;
  opacity: 0;
`;

const Tooltip: FunctionComponent<TooltipProps> = ({
  children,
  onClick,
  tip,
}) => {
  const tipId = tip.replace(" ", "-");
  return (
    <StyledText onClick={onClick} tip={tipId}>
      {children}
      <StyledTooltip id={tipId}>{tip}</StyledTooltip>
    </StyledText>
  );
};

export default Tooltip;
