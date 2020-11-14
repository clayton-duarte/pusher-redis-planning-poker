import React, { FunctionComponent, MouseEvent } from "react";
// import styled from "@emotion/styled";

import { useRoom } from "../providers/room";
import Button from "./Button";

const HostTools: FunctionComponent = () => {
  const { resetVotes } = useRoom();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    resetVotes();
  };

  return (
    <>
      <Button onClick={handleClick}>reset</Button>
    </>
  );
};

export default HostTools;
