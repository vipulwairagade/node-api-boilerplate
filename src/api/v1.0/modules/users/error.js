class UserApiError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = "UserApiError";
    this.status = httpStatus;
  }
}

exports.UserApiError = UserApiError;
