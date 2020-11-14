import React from "react";
import { NextPage } from "next";

import ParticipantTools from "../components/ParticipantTools";
import ParticipantList from "../components/ParticipantList";
import HostTools from "../components/HostTools";
import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Text from "../components/Text";

const RoomPage: NextPage = () => {
  const { room } = useRoom();
  const { user } = useUser();

  const isHost = user?.id === room?.host?.id;

  return (
    <>
      <Text primary>Room: {room?.id}</Text>
      {isHost ? <HostTools /> : <ParticipantTools />}
      <ParticipantList />
    </>
  );
};

export default RoomPage;
