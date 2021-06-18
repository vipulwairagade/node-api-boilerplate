const bcrypt = require("bcrypt");
import { appConfig } from "../configs";

export const generateHash = plainTextPassword => {
  const salt = bcrypt.genSaltSync(appConfig.SALT_ROUNDS);
  const hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};

export const compareHash = (plainTextPassword, hash) => {
  const isMatch = bcrypt.compareSync(plainTextPassword, hash);
  return isMatch;
};
