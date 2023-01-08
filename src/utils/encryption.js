const CryptoJS = require("crypto-js");
import { envConfig } from "#configs/index";

export const encryptData = data => {
	try {
		const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), CryptoJS.enc.Utf8.parse(envConfig.CRYPTO_SECRET_KEY), {
			keySize: 128 / 8,
			iv: CryptoJS.enc.Utf8.parse(envConfig.CRYPTO_IV),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	} catch (error) {
		throw error;
	}
};

export const decryptData = ciphertext => {
	try {
		const decrypted = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(envConfig.CRYPTO_SECRET_KEY), {
			keySize: 128 / 8,
			iv: CryptoJS.enc.Utf8.parse(envConfig.CRYPTO_IV),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	} catch (err) {
		const error = new Error("Invalid Request while decrypting token");
		error.status = 400;
		throw error;
	}
};
