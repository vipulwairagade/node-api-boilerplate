/* eslint-disable no-console */
const mysql = require("mysql");
const util = require("util");
import { envConfig } from "../configs";

const pool = mysql.createPool({
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  user: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME,
  connectionLimit: 100,
  timezone: "utc",
  multipleStatements: true
});
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  console.log("Successfully connected to Database !!");

  if (connection) {
    connection.release();
  }
});

export const mysqlConnection = util.promisify(pool.query).bind(pool);
