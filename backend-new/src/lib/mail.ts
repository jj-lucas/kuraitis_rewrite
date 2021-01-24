import orderConfirmationTemplate from '../templates/orderConfirmation'
import shippingTemplate from '../templates/shipping'
import { translate } from './translations'

const nodemailer = require('nodemailer')

const sendConfirmationMail = async order => {
	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	})

	const mailRes = await transport.sendMail({
		from: process.env.GMAIL_APP_USERNAME,
		to:
			process.env.OUTGOING_MAILS_ENABLED === 'true' ||
			order.customer.email.includes('@kuraitis.dk') ||
			order.customer.email.includes('@lucsali.com')
				? order.customer.email
				: process.env.MAIL_USER,
		// bcc: process.env.MAIL_BCC,
		subject: translate('subject_order_confirmation', order.locale, null, { id: order.number }),
		html: orderConfirmationTemplate(order),
		/*envelope: {
			from: process.env.GMAIL_APP_USERNAME,
			to: process.env.OUTGOING_MAILS_ENABLED === 'true' ||
			order.customer.email.includes('@kuraitis.dk') ||
			order.customer.email.includes('@lucsali.com')
				? order.customer.email
				: process.env.MAIL_USER,
		},*/
	})
}

const sendShippingMail = async order => {
	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	})

	const mailRes = await transport.sendMail({
		from: process.env.GMAIL_APP_USERNAME,
		to:
			process.env.OUTGOING_MAILS_ENABLED === 'true' ||
			order.customer.email.includes('@kuraitis.dk') ||
			order.customer.email.includes('@lucsali.com')
				? order.customer.email
				: process.env.MAIL_USER,
		// bcc: process.env.MAIL_BCC,
		subject: translate('subject_shipping', order.locale, null, { id: order.number }),
		html: shippingTemplate(order),
		/*envelope: {
			from: process.env.GMAIL_APP_USERNAME,
			to: process.env.OUTGOING_MAILS_ENABLED === 'true' ||
			order.customer.email.includes('@kuraitis.dk') ||
			order.customer.email.includes('@lucsali.com')
				? order.customer.email
				: process.env.MAIL_USER,
		},*/
	})
}

export { sendConfirmationMail, sendShippingMail }
