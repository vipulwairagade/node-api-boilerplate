import httpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { ERROR_CODES } from "#constants/index";
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
		throw httpError(StatusCodes.BAD_REQUEST, "Invalid phone number", ERROR_CODES.INVALID);
	}
	if (!isValidNumberForRegion(phoneNumber, region)) {
		throw httpError(StatusCodes.BAD_REQUEST, "Invalid phone number for given region", ERROR_CODES.INVALID);
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

export const parsePhoneNumber = number => {
	return phoneUtil.parse(number, "US");
};
