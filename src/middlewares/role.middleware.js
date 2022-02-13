import { StatusCodes } from "http-status-codes";
import { ERROR_CODES } from "#constants/index";
class RoleMiddlewareError extends Error {
	constructor(message, httpStatus, errorCode) {
		super(message);
		this.name = "RoleMiddlewareError";
		this.status = httpStatus;
		this.errorCode = errorCode;
	}
}

export const validateRole = (...roles) => {
	// eslint-disable-next-line consistent-return
	return (req, res, next) => {
		try {
			const { role } = res.locals.user;
			if (roles && roles.length > 0 && !roles.includes(role.code)) {
				throw new RoleMiddlewareError("Role Not Allowed", StatusCodes.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED);
			}
			return next();
		} catch (error) {
			throw error;
		}
	};
};
