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

export const getTimeStr = (millis) => {
  const time = convertToTime(millis)
  return `${time.hours}:${time.minutes}:${time.seconds}`
}