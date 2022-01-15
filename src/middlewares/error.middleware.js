export const errorMiddleware = (error, req, res) => {
	error.details = Array.isArray(error.details) ? error.details : [error.details];
	if (error.status < 500) {
		res.jsend.fail(
			error.message,
			{
				errorName: error.name,
				details: error.details
			},
			error.status
		);
		return;
	}
	res.jsend.error(error.message, error.status, error.code, {
		errorName: error.name,
		details: error.details
	});
};
