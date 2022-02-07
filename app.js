import express from "express";
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

import { logger, expressLogger } from "#helpers/index";
import { errorMiddleware } from "#middlewares/index";
import { jsend } from "#utils/index";

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	allowedHeaders: ["Content-Type", "Authorization"],
	exposedHeaders: ["Authorization"]
};

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "20MB" }));
app.use(jsend());
app.use(express.urlencoded({ extended: false, limit: "50MB" }));
app.use(cookieParser());
app.use(expressLogger);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, ".data")));
app.use(express.static(path.join(__dirname, "logs")));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", require("./src/api"));

app.use((err, req, res, next) => {
	logger.error(err);
	errorMiddleware(err, req, res, next);
});

// log uncaught exception
process.on("uncaughtException", err => {
	logger.error("Uncaught exception.");
	logger.fatal({ err });
	process.exit(1);
});

module.exports = { app, server };
