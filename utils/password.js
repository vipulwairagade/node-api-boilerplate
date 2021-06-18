const randomize = require("randomatic");

export const generatePassword = () => {
  const password = randomize("Aa0!", 10);
  return password;
};
