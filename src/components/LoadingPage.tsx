import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  place-items: center;
  min-height: 90vh;
  display: grid;
  gap: 1rem;
`;

const Text = styled.span`
  font-size: 4rem;
`;

const LoadingPage: FunctionComponent = () => {
  const [index, setIndex] = useState<number>(0);

  const clocks = [
    <Text>🕛</Text>,
    <Text>🕐</Text>,
    <Text>🕑</Text>,
    <Text>🕒</Text>,
    <Text>🕓</Text>,
    <Text>🕔</Text>,
    <Text>🕕</Text>,
    <Text>🕖</Text>,
    <Text>🕗</Text>,
    <Text>🕘</Text>,
    <Text>🕙</Text>,
    <Text>🕚</Text>,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = index + 1;
      if (nextIndex < 12) return setIndex(nextIndex);
      return setIndex(0);
    }, 100);

    return () => clearInterval(interval);
  });

  return <Wrapper>{clocks[index]}</Wrapper>;
};

export default LoadingPage;
