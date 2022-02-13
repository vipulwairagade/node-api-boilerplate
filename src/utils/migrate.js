const DBMigrate = require("db-migrate");
const path = require("path");
import { logger } from "#helpers/index";
import { envConfig } from "#configs/index";

const dbmOpts = {
	config: {
		development: {
			host: envConfig.DB_HOST,
			port: envConfig.DB_PORT,
			user: envConfig.DB_USERNAME,
			password: envConfig.DB_PASSWORD,
			database: envConfig.DB_NAME,
			multipleStatements: true,
			driver: "mysql8"
		},
		production: {
			host: envConfig.DB_HOST,
			port: envConfig.DB_PORT,
			user: envConfig.DB_USERNAME,
			password: envConfig.DB_PASSWORD,
			database: envConfig.DB_NAME,
			multipleStatements: true,
			driver: "mysql8"
		}
	},
	cmdOptions: {
		"migrations-dir": path.join(__dirname, "..", "..", "db", "migrations")
	}
};

export const migrate = async () => {
	// getting an instance of dbmigrate
	const dbmigrate = await DBMigrate.getInstance(true, dbmOpts);
	await dbmigrate.up();
	logger.debug("Database migrated");
};

// migrate();
