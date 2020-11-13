import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { NextPage } from "next";

const Text = styled.p`
  margin: 0;
`;

const RoomPage: NextPage = () => {
  const router = useRouter();
  const room = String(router.query.room);

  return (
    <>
      <Text>Room: {room}</Text>
    </>
  );
};

export default RoomPage;
