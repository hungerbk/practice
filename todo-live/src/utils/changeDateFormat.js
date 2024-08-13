export const changeDateFormat = (date: Date) => {
  return date.getFullYear() + "-" + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) + "-" + date.getDate();
};
