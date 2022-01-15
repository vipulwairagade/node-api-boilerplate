import HandleBars from "handlebars";

export const getEmailTemplate = ({ body, subject }, { bodyVariables, subjectVariables }) => {
	const bodyTemplate = HandleBars.compile(body);
	const subjectTemplate = HandleBars.compile(subject);

	const emailBody = bodyTemplate(bodyVariables);
	const emailSubject = subjectTemplate(subjectVariables);

	const finalMail = { subject: emailSubject, body: emailBody };

	return finalMail;
};
