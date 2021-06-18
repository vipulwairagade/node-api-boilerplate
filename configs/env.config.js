import { hostname } from "os";

const env = require("dotenv");
env.config({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.local" });

const {
  NODE_ENV,
  CONFIG_APP_PORT,
  CONFIG_DB_HOST,
  CONFIG_DB_PORT,
  CONFIG_DB_USERNAME,
  CONFIG_DB_PASSWORD,
  CONFIG_DB_NAME,
  CONFIG_JWT_SECRET_KEY
} = process.env;

export const envConfig = {
  ENV: NODE_ENV,
  HOSTNAME: hostname(),

  APP_PORT: parseFloat(CONFIG_APP_PORT),

  DB_HOST: CONFIG_DB_HOST,
  DB_PORT: CONFIG_DB_PORT,
  DB_USERNAME: CONFIG_DB_USERNAME,
  DB_PASSWORD: CONFIG_DB_PASSWORD,
  DB_NAME: CONFIG_DB_NAME,

  JWT_SECRET_KEY: CONFIG_JWT_SECRET_KEY
};
