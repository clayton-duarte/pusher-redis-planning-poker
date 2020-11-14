import React from "react";
import { NextPage } from "next";

import ParticipantTools from "../components/ParticipantTools";
import ParticipantList from "../components/ParticipantList";
import HostTools from "../components/HostTools";
import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Text from "../components/Text";

const RoomPage: NextPage = () => {
  const { room } = useRoom();
  const { user } = useUser();

  const isHost = user?.id === room?.host?.id;

  return (
    <>
      <Main>
        <Text primary>User: {user?.name}</Text>
        {isHost ? <HostTools /> : <ParticipantTools />}
        <ParticipantList />
      </Main>
      <Sidebar />
    </>
  );
};

export default RoomPage;
