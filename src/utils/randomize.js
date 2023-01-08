const randomize = require("randomatic");

if (!randomize.isCrypto) {
	throw new Error("randomatic not using a cryptographically secure method.");
}

export const generatePassword = () => {
	const password = randomize("Aa0!", 10);
	return password;
};
