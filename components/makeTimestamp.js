export const makeTimestamp = () => {
  let offset = new Date().getTimezoneOffset() * 60000;
  const timestamp = new Date(new Date().getTime() - offset).toISOString();
  const year = timestamp.substring(0, 4);
  const month = timestamp.substring(5, 7);
  const date = timestamp.substring(8, 10);
  const hour = timestamp.substring(11, 13);
  const minute = timestamp.substring(14, 16);
  const timestampObj = {
    timestamp: timestamp,
    year: year,
    month: month,
    date: date,
    hour: hour,
    minute: minute,
  };
  return timestampObj;
};
