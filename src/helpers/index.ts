export const createID = (): string => {
  const timestamp = new Date().getTime().toString(16);
  const random = Math.random().toString(16).slice(2);
  return `${timestamp}-${random}`;
};
