// Require `PhoneNumberFormat`.
const PNF = require("google-libphonenumber").PhoneNumberFormat;
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const isValidNumber = number => {
	const result = phoneUtil.isValidNumber(number);
	return result;
};

export const isValidNumberForRegion = (number, region = "US") => {
	const result = phoneUtil.isValidNumberForRegion(number, region);
	return result;
};

export const formatNumber = number => {
	const result = phoneUtil.format(number, PNF.E164);
	return result;
};

// For making DB entry
export const verifyAndFormatNumber = (number, region = "US") => {
	// Parse number with country code and keep raw input.
	const phoneNumber = phoneUtil.parse(number.toString(), region);
	if (!isValidNumber(phoneNumber)) {
		throw new Error("Invalid phone number");
	}
	if (!isValidNumberForRegion(phoneNumber, region)) {
		throw new Error("Invalid phone number for given region");
	}
	return formatNumber(phoneNumber);
};


export const formatNumberWithoutPlus = number => {
	const phoneNumber = phoneUtil.parse(number);
	const countryCode = phoneNumber.getCountryCode();
	const nationalNumber = phoneNumber.getNationalNumber();
	const formattedNumber = `${countryCode}${nationalNumber}`;
	return formattedNumber;
};
