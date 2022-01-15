const nodemailer = require("nodemailer");
import { envConfig } from "../configs";

export const transporter = nodemailer.createTransport({
	host: envConfig.EMAIL_HOST,
	port: envConfig.EMAIL_PORT,
	secure: false, // true for 465, false for other ports
	auth: {
		user: envConfig.EMAIL_USER,
		pass: envConfig.EMAIL_PASSWORD
	}
});

export const sendEmail = async (to, subject, message, attachment) => {
	try {
		const mailOptions = {
			from: envConfig.EMAIL_USER,
			// from: {
			// 	name: "<name-here>",
			// 	address: envConfig.EMAIL_USER
			// },
			to,
			subject,
			html: message,
			attachments: attachment
		};

		const response = await transporter.sendMail(mailOptions);
		return response;
	} catch (error) {
		throw error;
	}
};
