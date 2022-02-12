import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

import { expressLogger } from "#helpers/index";
import { errorMiddleware } from "#middlewares/index";
import { jsend } from "#utils/index";
import apiRoutes from "./api";

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
app.use(express.urlencoded({ extended: false, limit: "50MB" }));
app.use(cookieParser());
app.use(expressLogger);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, ".data")));
app.use(express.static(path.join(__dirname, "logs")));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use("/api", apiRoutes);
app.use("/", (req, res) => {
	res.redirect("/api/health");
});

app.use((err, req, res, next) => {
	errorMiddleware(err, req, res, next);
});

export { app };
