import React from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import ParticipantTools from "../components/ParticipantTools";
import ParticipantList from "../components/ParticipantList";
import { findClosestEstimate } from "../helpers";
import LoadingPage from "../components/LoadingPage";
import HostTools from "../components/HostTools";
import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Sidebar from "../components/Sidebar";
import Share from "../components/Share";
import Main from "../components/Main";
import Text from "../components/Text";
import Row from "../components/Row";

const Wrapper = styled(Row)`
  grid-template-columns: auto auto;
  justify-content: space-between;
`;

const RoomPage: NextPage = () => {
  const { room } = useRoom();
  const { user } = useUser();

  if (!(room && user)) return <LoadingPage />;

  const isVisible = room?.reveal;
  const isHost = user?.email === room?.host?.email;
  const estimate = isVisible && findClosestEstimate(room);

  return (
    <>
      <Main room>
        <Wrapper>
          <Text primary caps>
            {isHost ? <span>📢</span> : <span>🧑‍💻</span>} Hello {user?.name}!
          </Text>
          <Text primary>🗳️ Round: {room?.rounds?.length + 1}</Text>
        </Wrapper>
        {isHost ? <HostTools /> : <ParticipantTools />}
        <Wrapper>
          <Text primary>👥 Participants {room?.members?.length - 1}</Text>
          {estimate && <Text primary>🃏 Estimate: {estimate}</Text>}
        </Wrapper>
        <ParticipantList />
      </Main>
      <Sidebar />
      <Share />
    </>
  );
};

export default RoomPage;
