export const convertToTime = (milliseconds) => {
  const date = new Date(milliseconds);
  return {
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
  };
};

export const convertToMs = (timet) => {
  return timet.hours * 3600000 + timet.minutes * 60000 + timet.seconds * 1000;
};
