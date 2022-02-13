import { envConfig } from "#configs/index";
import { LOG_LEVELS, ENVIRONMENTS } from "#constants/index";
const pino = require("pino");
const pinoExpress = require("express-pino-logger");

const level = envConfig.ENV === ENVIRONMENTS.PRODUCTION ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG;
const prettyPrint = {
	colorize: "true", // --colorize: add terminal color escape sequence to the output
	levelFirst: true, // --levelFirst: display the log level name before the logged date and time
	translateTime: "SYS:standard", // --translateTime: translate the epoch time to local system's TZ, in human readable format
	ignore: "pid,hostname,module" // --ignore: ignore one or several keys
	// singleLine: true, // --singleLine: print each log message on a single line
	// messageFormat: "({module}) {msg}" // --messageFormat: format outpout for the message portion of the log
};

export const logger = pino({
	name: "server",
	level: level || LOG_LEVELS.DEBUG,
	formatters: {
		level(label) {
			return { level: label };
		}
	},
	prettyPrint: envConfig.ENV === ENVIRONMENTS.PRODUCTION ? false : prettyPrint
});

export const expressLogger = pinoExpress({
	name: "express",
	level: level || LOG_LEVELS.INFO,
	formatters: {
		level(label) {
			return { level: label };
		}
	},
	serializers: {
		res: res => ({
			status: res.statusCode
		}),
		req: req => ({
			method: req.method,
			url: req.url
		})
	},
	prettyPrint: envConfig.ENV === ENVIRONMENTS.PRODUCTION ? false : prettyPrint
});
