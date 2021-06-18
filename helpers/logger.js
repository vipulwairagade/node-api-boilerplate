import { envConfig } from "../configs";
import { LOG_LEVELS, ENVIRONMENTS } from "../constants";
const pino = require("pino");
const pinoExpress = require("express-pino-logger");

const level = envConfig.ENV === ENVIRONMENTS.DEVELOPMENT ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;

export const serverLogger = pino(
  {
    name: "server",
    level,
    formatters: {
      level(label) {
        return { level: label };
      }
    }
  },
  pino.destination(`./logs/server-${envConfig.ENV}`)
);

export const expressLogger = pinoExpress(
  {
    name: "express",
    level,
    formatters: {
      level(label) {
        return { level: label };
      }
    }
  },
  pino.destination(`./logs/express-${envConfig.ENV}`)
);
