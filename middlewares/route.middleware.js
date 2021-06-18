import { StatusCodes, ReasonPhrases } from "http-status-codes";

class MethodNotAllowedError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = "MethodNotAllowedError";
    this.status = httpStatus;
  }
}

export const methodNotAllowed = () => {
  try {
    throw new MethodNotAllowedError(ReasonPhrases.METHOD_NOT_ALLOWED, StatusCodes.METHOD_NOT_ALLOWED);
  } catch (error) {
    throw error;
  }
};

class RouteNotFoundError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = "RouteNotFoundError";
    this.status = httpStatus;
  }
}

export const routeNotFound = () => {
  try {
    throw new RouteNotFoundError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
  } catch (error) {
    throw error;
  }
};
