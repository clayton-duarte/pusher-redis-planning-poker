import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "@emotion/styled";

import Button from "./Button";
import Text from "./Text";
import Row from "./Row";

const Container = styled(Row)`
  border: 1px solid ${(props) => props.theme.secondary};
  background: ${(props) => props.theme.bg};
  border-radius: 0.25rem;
  align-content: start;
  grid-area: share;
  padding: 1rem;
`;

const Wrapper = styled(Row)`
  grid-template-columns: auto auto;
  justify-content: space-between;
`;

const FakeText = styled.input`
  all: unset; // keep it first
  font-size: 0.75rem;
`;

const Share: FunctionComponent = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(true);
  const [clipboard, setClipboard] = useState<string>("");
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    setLink(window.location.href);
  }, []);

  const copyClipboard = () => {
    if (hasPermission) {
      navigator?.clipboard
        ?.readText()
        .then((text) => {
          setClipboard(text);
        })
        .catch(() => {
          setHasPermission(false);
        });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", copyClipboard);
    return () => removeEventListener("keydown", copyClipboard);
  }, []);

  useEffect(() => {
    window.addEventListener("focus", copyClipboard);
    return () => removeEventListener("focus", copyClipboard);
  }, []);

  const handleClick = () => {
    var copyText = document.getElementById(
      "shareable-link"
    ) as HTMLInputElement;
    copyText.focus();
    copyText.select();
    copyText.setSelectionRange(0, 99999); // mobile support
    document.execCommand("copy");
    setClipboard(link);
  };

  const handleBlur = () => {
    if (!hasPermission) {
      setClipboard("");
    }
  };

  return (
    <Container onClick={handleClick}>
      <Wrapper>
        <Text>🔗 Share this room</Text>
        <Button>{clipboard === link ? "Copied!" : "Copy"}</Button>
      </Wrapper>
      <FakeText id="shareable-link" readOnly onBlur={handleBlur} value={link} />
    </Container>
  );
};

export default Share;
