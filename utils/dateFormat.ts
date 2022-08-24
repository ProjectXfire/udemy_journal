const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const formattingDate = (date: number) => {
  const setDate = new Date(date);
  const day = setDate.getUTCDate();
  const fullYear = setDate.getFullYear();
  const month = months[setDate.getMonth()];
  return `on ${day} ${month}, ${fullYear}`;
};

export const getDay = (date: number) => {
  const setDate = new Date(date);
  const day = setDate.getUTCDate();
  return day;
};

export const getMonth = (date: number) => {
  const setDate = new Date(date);
  const month = months[setDate.getMonth()];
  const capLetter = month.charAt(0).toUpperCase();
  const restLetters = month.slice(1, month.length);
  return capLetter + restLetters;
};
