import { logger } from "#helpers/index";

export const catchAsync = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(error => {
		logger.error(error);
		next(error);
	});
};
