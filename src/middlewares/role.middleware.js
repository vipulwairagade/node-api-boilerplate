import { StatusCodes } from "http-status-codes";
class RoleMiddlewareError extends Error {
	constructor(message, httpStatus) {
		super(message);
		this.name = "RoleMiddlewareError";
		this.status = httpStatus;
	}
}

export const validateRole = (...roles) => {
	// eslint-disable-next-line consistent-return
	return (req, res, next) => {
		try {
			const { role } = res.locals.user;
			if (roles && roles.length > 0 && !roles.includes(role.code)) {
				throw new RoleMiddlewareError("Role Not Allowed", StatusCodes.UNAUTHORIZED);
			}
			return next();
		} catch (error) {
			throw error;
		}
	};
};
