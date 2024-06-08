export const convertUnixTime = (unixTime: number) => {
  return new Date(unixTime * 1000).toLocaleString();
};
