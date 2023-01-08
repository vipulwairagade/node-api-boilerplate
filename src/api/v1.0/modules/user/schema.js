import { joiExtended as Joi } from "#helpers/index";

export const schema = {
	analyzeContract: {
		body: Joi.object({
			name: Joi.string().required(),
			email: Joi.emailextended().noDisposableDomains().required(),
			contact_number: Joi.string().verifyPhoneNumber().validPhoneNumberForRegion(),
			company: Joi.string().required(),
			contract_code: Joi.string().optional()
		})
	}
};
