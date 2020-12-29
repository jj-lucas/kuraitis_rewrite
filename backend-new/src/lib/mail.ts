import orderConfirmationTemplate from '../templates/orderConfirmation'

const nodemailer = require('nodemailer')

const sendConfirmationMail = async order => {
	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	})

	console.log('hey')
	console.log(order)
	console.log(order.createdAt)

	const mailRes = await transport.sendMail({
		from: process.env.GMAIL_APP_USERNAME,
		to: process.env.OUTGOING_MAILS_ENABLED === 'true' ? order.customer.email : process.env.MAIL_USER,
		// bcc: process.env.MAIL_BCC,
		subject: 'Thank you for your order',
		html: orderConfirmationTemplate(order),
		/*envelope: {
			from: process.env.GMAIL_APP_USERNAME,
			to: process.env.OUTGOING_MAILS_ENABLED === 'true' ? order.customer.email : process.env.MAIL_USER,
		},*/
	})
}

export default sendConfirmationMail
