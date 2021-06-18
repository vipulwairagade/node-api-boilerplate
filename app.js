const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

import { errorMiddleware } from "./middlewares";
import { jsend } from "./utils";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"]
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "20MB" }));
app.use(jsend());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "logs")));
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/api", require("./api"));

app.use((err, req, res, next) => {
  errorMiddleware(err, req, res, next);
});

module.exports = app;
