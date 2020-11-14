export const createID = (): string => {
  const timestamp = new Date().getTime().toString(16);
  const random = Math.random().toString(16).slice(2);
  return `${timestamp}-${random}`;
};

export const findClosestEstimate = (room: Room): Points => {
  const votingMembers = room?.members?.filter(
    ({ lastVote }) => lastVote != null
  );

  const total = votingMembers?.reduce(
    (prev, { lastVote }) => prev + Number(lastVote),
    0
  );

  const mid = Math.round(total / (votingMembers?.length || 1));

  if (mid < 4) {
    return String(mid) as "0" | "1" | "2" | "3";
  }
  if (mid < 7) {
    return "5";
  }
  if (mid < 11) {
    return "8";
  }
  if (mid < 17) {
    return "13";
  }
  if (mid < 25) {
    return "20";
  }
  if (mid < 50) {
    return "40";
  }
  return "100";
};
