const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

import { expressLogger, serverLogger } from "@helpers";
import { errorMiddleware } from "@middlewares";
import { jsend } from "@utils";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"]
};

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "20MB" }));
app.use(jsend());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLogger);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "logs")));
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/api", require("./api"));

app.use((err, req, res, next) => {
  serverLogger.error(err);
  errorMiddleware(err, req, res, next);
});

// log uncaught exception
process.on("uncaughtException", err => {
  serverLogger.error("Uncaught exception.");
  serverLogger.fatal({ err });
  process.exit(1);
});

module.exports = app;
