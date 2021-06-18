import { StatusCodes } from "http-status-codes";
class RoleMiddlewareError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = "RoleMiddlewareError";
    this.status = httpStatus;
  }
}

export const validateRole = (...roles) => {
  return (req, res, next) => {
    try {
      const { role } = res.locals.user;
      if (roles && roles.length > 0 && !roles.includes(role)) {
        throw new RoleMiddlewareError("Role Not Allowed", StatusCodes.UNAUTHORIZED);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
