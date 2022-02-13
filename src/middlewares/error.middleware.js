import { logger } from "#helpers/index";
import { envConfig } from "#configs/index";
import { ENVIRONMENTS, ERROR_CODES } from "#constants/index";

export const errorMiddleware = (error, req, res) => {
	error.details = Array.isArray(error.details) ? error.details : [error.details];
	if (error.status < 500) {
		if (envConfig.ENV === ENVIRONMENTS.DEVELOPMENT) {
			logger.error(error);
		}
		res.jsend.fail(
			error.message,
			{
				errorName: error.name,
				...envConfig.ENV === ENVIRONMENTS.DEVELOPMENT && { details: error.details }
			},
			error.errorCode,
			error.status
		);
		return;
	}
	logger.error(error);
	res.jsend.error(error.message, error.status, ERROR_CODES.UNKNOWN_ERROR, {
		errorName: error.name,
		code: error.code,
		...envConfig.ENV === ENVIRONMENTS.DEVELOPMENT && { details: error.details }
	});
};
