import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { NextPage } from "next";

import { createRoomId } from "../libs/room";

const Text = styled.p`
  margin: 0;
`;

const Button = styled.button`
  margin: 0;
`;

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Text>Cool Styles</Text>
      <Button onClick={() => router.push(`/${createRoomId()}`)}>
        create room
      </Button>
    </>
  );
};

export default HomePage;
