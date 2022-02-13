export const jsend = () => {
	return (req, res, next) => {
		res.jsend = {
			success: (data, message = "Successful", statusCode = 200) => {
				res.status(statusCode).send({
					status: "success",
					message,
					data
				});
			},
			fail: (message, data, errorCode = null, statusCode = 400) => {
				res.status(statusCode).send({
					status: "fail",
					message,
					errorCode,
					data
				});
			},
			error: (message, statusCode = 500, errorCode = null, data = null) => {
				res.status(statusCode).send({
					status: "error",
					message,
					errorCode,
					data
				});
			}
		};
		next();
	};
};
