/* eslint-disable no-console */
const mysql = require("mysql2");
const util = require("util");
import { envConfig } from "#configs/index";
import { logger } from "#helpers/index";

const pool = mysql.createPool({
	host: envConfig.DB_HOST,
	port: envConfig.DB_PORT,
	user: envConfig.DB_USERNAME,
	password: envConfig.DB_PASSWORD,
	database: envConfig.DB_NAME,
	connectionLimit: 100,
	multipleStatements: true
});
const getConnection = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				if (err.code === "PROTOCOL_CONNECTION_LOST") {
					console.error("Database connection was closed.");
					reject(new Error("Database connection was closed."));
				}
				if (err.code === "ER_CON_COUNT_ERROR") {
					console.error("Database has too many connections.");
					reject(new Error("Database has too many connections."));
				}
				if (err.code === "ECONNREFUSED") {
					logger.error("Database connection was refused.");
					reject(new Error("Database connection was refused."));
				}
			}
			logger.info("Successfully connected to Database !!");

			if (connection) {
				const beginTransaction = util.promisify(connection.beginTransaction).bind(connection);
				const rollback = util.promisify(connection.rollback).bind(connection);
				const query = util.promisify(connection.query).bind(connection);
				const commit = util.promisify(connection.commit).bind(connection);
				resolve({ beginTransaction, rollback, query, commit, connection });
			}
		});
	});
};

export const mysqlQuery = util.promisify(pool.query).bind(pool);

export const mysqlTransaction = async (queries, queryValues) => {
	if (queries.length !== queryValues.length) {
		throw new Error("Number of provided queries did not match the number of provided query values arrays");
	}
	const connection = await getConnection();

	try {
		await connection.beginTransaction();

		const queryPromises = [];
		queries.forEach((query, index) => {
			queryPromises.push(connection.query({ sql: query, values: queryValues[index] }));
		});
		const results = await Promise.all(queryPromises);

		await connection.commit();
		connection.connection.release();
		return results;
	} catch (err) {
		await connection.rollback();
		connection.connection.release();
		throw err;
	}
};

getConnection();
