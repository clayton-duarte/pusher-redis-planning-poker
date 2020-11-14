import React from "react";
import { NextPage } from "next";

import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Button from "../components/Button";
import Text from "../components/Text";

const HomePage: NextPage = () => {
  const { user, deleteUser } = useUser();
  const { createRoom } = useRoom();

  return (
    <>
      <Text>Hello {user?.name}!</Text>
      <Button onClick={createRoom}>create room</Button>
      <Button onClick={deleteUser}>logout</Button>
    </>
  );
};

export default HomePage;
