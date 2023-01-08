
/**
 * joiExtended implements custom Joi validations. The exported value is the Joi module extended
 * with the custom validations.
 */

const BaseJoi = require("joi");
import { isValidNumber, isValidNumberForRegion, parsePhoneNumber } from "#utils/phoneNumber";
import { DISPOSABLE_DOMAINS } from "#constants/index";

const checkDisposableDomains = value => {
	const domain = value.substring(value.lastIndexOf("@") + 1).toLowerCase();
	const disposableDomainsList = new Set(DISPOSABLE_DOMAINS);
	const emailDisposable = disposableDomainsList.has(domain);
	if (emailDisposable) {
		return true;
	}
	return false;
};

const checkDisposableEmail = joi => {
	return {
		type: "emailextended",
		base: joi.string().email(),
		messages: {
			"emailextended.domain": "{{#label}} must be a valid domain"
		},
		rules: {
			noDisposableDomains: {
				method() {
					return this.$_addRule("noDisposableDomains");
				},
				validate(value, helpers) {
					if (checkDisposableDomains(value)) {
						return helpers.error("emailextended.domain");
					}
					return value;
				}
			}
		}
	};
};


const verifyPhoneNumber = joi => ({
	base: joi.string(),
	type: "string",
	messages: {
		"string.PhNumber": "{{#label}} must be a valid phone number",
		"string.PhNumberRegion": "{{#label}} Phone Number and region code doesnt match"
	},
	rules: {
		verifyPhoneNumber: {
			method() {
				return this.$_addRule("verifyPhoneNumber");
			},
			validate(value, helpers) {
				const phoneNumber = parsePhoneNumber(value);
				if (!isValidNumber(phoneNumber)) {
					return helpers.error("string.PhNumber");
				}
				return value;
			}
		},
		validPhoneNumberForRegion: {
			method() {
				return this.$_addRule("validPhoneNumberForRegion");
			},
			validate(value, helpers) {
				const phoneNumber = parsePhoneNumber(value);
				if (!isValidNumberForRegion(phoneNumber)) {
					return helpers.error("string.PhNumberRegion");
				}
				return value;
			}
		}
	}
});

// Implement more extensions by adding functions to this array.
export const joiExtended = BaseJoi.extend(checkDisposableEmail, verifyPhoneNumber);
