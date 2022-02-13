const jwt = require("jsonwebtoken");
import { envConfig, tokenConfig } from "#configs/index";
import { ERROR_CODES } from "#constants/index";

export const generateToken = tokenData => {
	const token = jwt.sign({ data: tokenData }, envConfig.JWT_SECRET_KEY, { expiresIn: tokenConfig.TOKEN_LIFE });
	return token;
};

export const generateRefreshToken = tokenData => {
	const refreshToken = jwt.sign({ data: tokenData }, envConfig.JWT_REFRESH_SECRET_KEY, {
		expiresIn: tokenConfig.REFRESH_TOKEN_LIFE
	});
	return refreshToken;
};

export const verifyToken = token => {
	try {
		const decodedData = jwt.verify(token, envConfig.JWT_SECRET_KEY);
		return decodedData;
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			err.message = "User Session Expired";
			err.status = 401;
			err.errorCode = ERROR_CODES.UNAUTHENTICATED;
			throw err;
		}
		throw err;
	}
};

export const verifyTokenWithoutExpiration = token => {
	try {
		const decodedData = jwt.verify(token, envConfig.JWT_SECRET_KEY, { ignoreExpiration: true });
		return decodedData;
	} catch (err) {
		throw err;
	}
};

export const verifyRefreshToken = token => {
	try {
		const decodedData = jwt.verify(token, envConfig.JWT_REFRESH_SECRET_KEY);
		return decodedData;
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			err.message = "Refresh Token Expired";
			err.status = 403;
			err.errorCode = ERROR_CODES.UNAUTHORIZED;
			throw err;
		}
		throw err;
	}
};
