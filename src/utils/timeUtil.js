export const getStartDayOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1).getDay();

export const checkIsLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getShiftedMonth = (month) => {
  return ((month + 1 + 9) % 12) + 1;
};

export const getStartDayOfMonth2 = (day, month, year) => {
  const shiftedMonth = getShiftedMonth(month);
  const firstTwoDigitOfYear = parseInt(year.toString().slice(0, 2));
  const lastTwoDigitOfYear = parseInt(year.toString().slice(2, 4));
  const result =
    (31 +
      Math.floor(2.6 * shiftedMonth - 0.2) +
      lastTwoDigitOfYear +
      Math.floor(lastTwoDigitOfYear / 4) +
      Math.floor(firstTwoDigitOfYear / 4) -
      2 * firstTwoDigitOfYear) %
    7;
  console.log("result", result);
};
