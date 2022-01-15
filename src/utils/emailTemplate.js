import HandleBars from "handlebars";

export const getEmailTemplate = async ({body, subject}, {bodyVariables, subjectVariables }) => {

	const bodyTemplate = HandleBars.compile(mail.body);
	const subjectTemplate = HandleBars.compile(mail.subject);

	const emailBody = bodyTemplate(bodyVariables);
	const emailSubject = subjectTemplate(subjectVariables);

	const finalMail = { subject: emailSubject, body: emailBody };

	return finalMail;
};
