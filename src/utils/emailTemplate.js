import HandleBars from "handlebars";

export const getEmailTemplate = (body, bodyVariables) => {
	const bodyTemplate = HandleBars.compile(body);
	const emailBody = bodyTemplate(bodyVariables);
	const finalMail = { body: emailBody };
	return finalMail;
};
