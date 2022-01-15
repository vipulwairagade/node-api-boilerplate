const CryptoJS = require("crypto-js");
import { envConfig } from "../configs";

export const encryptObjectData = data => {
	const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), envConfig.CRYPTO_SECRET_KEY).toString();
	return ciphertext;
};

export const decryptObjectData = ciphertext => {
	try {
		const bytes = CryptoJS.AES.decrypt(ciphertext, envConfig.CRYPTO_SECRET_KEY);
		const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		return decryptedData;
	} catch (err) {
		const error = new Error("Invalid Request while decrypting token");
		error.status = 400;
		throw error;
	}
};
