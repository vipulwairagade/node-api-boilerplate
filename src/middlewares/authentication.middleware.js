import { StatusCodes } from "http-status-codes";
import { verifyToken } from "#utils/index";
class AuthenticationMiddlewareError extends Error {
	constructor(message, httpStatus) {
		super(message);
		this.name = "AuthenticationMiddlewareError";
		this.status = httpStatus;
	}
}

export const validateUser = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw new AuthenticationMiddlewareError("Authorization header not present", StatusCodes.UNAUTHORIZED);
		}

		if (!authHeader.startsWith("Bearer")) {
			throw new AuthenticationMiddlewareError("Invalid Authorization header type", StatusCodes.BAD_REQUEST);
		}

		const token = authHeader.split(" ")[1];
		const tokenData = verifyToken(token);
		res.locals.user = tokenData.data;
		return next();
	} catch (error) {
		throw error;
	}
};
