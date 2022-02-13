import { StatusCodes } from "http-status-codes";
import { verifyToken } from "#utils/index";
import { ERROR_CODES } from "#constants/index";
class AuthenticationMiddlewareError extends Error {
	constructor(message, httpStatus, errorCode) {
		super(message);
		this.name = "AuthenticationMiddlewareError";
		this.status = httpStatus;
		this.errorCode = errorCode;
	}
}

export const validateUser = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw new AuthenticationMiddlewareError("Authorization header not present", StatusCodes.UNAUTHORIZED, ERROR_CODES.UNAUTHENTICATED);
		}

		if (!authHeader.startsWith("Bearer")) {
			throw new AuthenticationMiddlewareError("Invalid Authorization header type", StatusCodes.BAD_REQUEST, ERROR_CODES.INVALID);
		}

		const token = authHeader.split(" ")[1];
		const tokenData = verifyToken(token);
		res.locals.user = tokenData.data;
		return next();
	} catch (error) {
		throw error;
	}
};
