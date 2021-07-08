import { envConfig } from "../configs";
import { LOG_LEVELS, ENVIRONMENTS } from "../constants";
const pino = require("pino");
const pinoExpress = require("express-pino-logger");

const level = envConfig.ENV === ENVIRONMENTS.DEVELOPMENT ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;

export const serverLogger = pino(
  {
    name: "server",
    level: level || LOG_LEVELS.DEBUG,
    formatters: {
      level(label) {
        return { level: label };
      }
    }
  }
);

export const expressLogger = pinoExpress(
  {
    name: "express",
    level: level || LOG_LEVELS.INFO,
    formatters: {
      level(label) {
        return { level: label };
      }
    }
  }
);
