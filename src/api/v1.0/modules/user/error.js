class UserApiError extends Error {
	constructor(message, httpStatus, errorCode) {
		super(message);
		this.name = "UserApiError";
		this.status = httpStatus;
		this.errorCode = errorCode;
	}
}

export { UserApiError };
