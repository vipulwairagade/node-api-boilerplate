export const getDate = string => (([year, month, day]) => ({ day, month, year }))(string.split("-"));

export const getTime = string => (([hour, minutes]) => ({ hour, minutes }))(string.split(":"));
