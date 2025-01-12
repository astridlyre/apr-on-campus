import nodemailer from "nodemailer";

if (
	!process.env.EMAIL_USERNAME ||
	!process.env.EMAIL_PASSWORD ||
	!process.env.EMAIL_HOST ||
	!process.env.EMAIL_PORT
) {
	throw new Error("Missing email configuration");
}

const transporter = nodemailer.createTransport({
	pool: true,
	host: process.env.EMAIL_HOST,
	port: Number(process.env.EMAIL_PORT),
	secure: true,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
});

transporter.verify((err) => {
	if (err) {
		console.error("Error verifying email transporter", err);
	}
});

export interface Message {
	from: string;
	to: string;
	subject: string;
	text: string;
	html: string;
}

export default function sendEmail(message: Message) {
	return new Promise((resolve, reject) => {
		transporter.sendMail(message, (err, info) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(info);
		});
	});
}
