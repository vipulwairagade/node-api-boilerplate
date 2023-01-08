const nodemailer = require("nodemailer");
import { envConfig } from "#configs/index";

export const sendEmail = async (to, subject, body) => {
	const transporter = nodemailer.createTransport({
		service: envConfig.EMAIL_HOST,
		auth: {
			user: envConfig.EMAIL_USER,
			pass: envConfig.EMAIL_PASSWORD
		}
	});
	const mailOptions = {
		from: envConfig.EMAIL_USER,
		to,
		subject,
		html: body
	};
	try {
		const emailDetails = await transporter.sendMail(mailOptions);
		return emailDetails;
	} catch (error) {
		return error;
	}
};
