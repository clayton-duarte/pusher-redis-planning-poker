import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

interface ModalProps {
  onCancel: () => void;
  open: boolean;
}

const Overlay = styled.aside<{ open: boolean }>`
  z-index: ${(props) => (props.open ? 9999 : -1)};
  opacity: ${(props) => (props.open ? 1 : 0)};
  justify-content: center;
  transition: 0.25s ease;
  align-items: center;
  background: #0005;
  position: fixed;
  display: grid;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`;

const Wrapper = styled.div<{ open: boolean }>`
  transform: scale(${(props) => (props.open ? 1 : 0)});
  background: ${(props) => props.theme.bg};
  border-radius: 0.25rem;
  transition: 0.25s ease;
  padding: 1rem;
  display: grid;
  margin: 1rem;
  gap: 1rem;
  @media (min-width: 768px) {
    max-width: 50vw;
  }
`;

const Modal: FunctionComponent<ModalProps> = ({ onCancel, open, children }) => {
  return (
    <Overlay open={open} onClick={onCancel} role="button">
      <Wrapper open={open}>{children}</Wrapper>
    </Overlay>
  );
};

export default Modal;
