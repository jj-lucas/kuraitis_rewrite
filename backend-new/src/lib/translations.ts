const translations = {
	// Mails
	subject_order_confirmation: {
		en: data => `Thank you for your order from Kuraitis.dk (#${data.id})`,
		da: '__subject_order_confirmation',
	},
	subject_shipping: {
		en: data => `Your order from Kuraitis.dk has been shipped (#${data.id})`,
		da: '__subject_shipping',
	},
	// Shipment mail
	order_shipped: {
		en: 'Your order has been shipped',
		da: '__order_shipped',
	},
	shipped_today: {
		en: data => `Your order #${data.id} placed on the ${data.date} is on its way.`,
		da: '__shipped_today',
	},
	track_package: {
		en: 'Track your package',
		da: '__track_package',
	},
	additional_questions: {
		en: data =>
			`For any additional question check out the FAQ page <a href="${data.url}/en/faq">here</a>.<br />
			You are welcome to contact Sergio directly for any question/comment regarding your order.`,
		da: '__additional_questions',
	},

	// Order confirmation mail
	thank_you_for_order: {
		en: 'Thank you for your order',
		da: '__thank_you_for_order',
	},
	you_will_receive_mail: {
		en:
			"You'll receive an email when your items have been shipped. <br>If you have any questions, feel free to respond to this mail.",
		da: '__you_will_receive_mail',
	},
	view_order_status: {
		en: 'View order status',
		da: '__view_order_status',
	},
	summary: {
		en: 'summary',
		da: '__summary',
	},
	order_nr: {
		en: 'Order #',
		da: '__order_nr',
	},
	order_date: {
		en: 'Order Date',
		da: '__order_date',
	},
	order_total: {
		en: 'Order total',
		da: '__order_total',
	},
	shipping_address: {
		en: 'Shipping address',
		da: '__shipping_address',
	},
	items_ordered: {
		en: 'Items ordered',
		da: '__items_ordered',
	},
	items_name: {
		en: 'name',
		da: '__items_ordered',
	},
	items_sku: {
		en: 'SKU',
		da: '__items_sku',
	},
	items_price: {
		en: 'price',
		da: '__items_price',
	},
	subtotal: {
		en: 'Subtotal',
		da: '__subtotal',
	},
	subtotal_item: {
		en: 'item',
		da: '__subtotal_item',
	},
	subtotal_items: {
		en: 'items',
		da: '__subtotal_items',
	},

	// shipping codes
	track_trace_international: {
		en: 'Track & Trace',
		da: 'Track & Trace',
	},
	track_trace_denmark: {
		en: 'Track & Trace',
		da: 'Track & Trace',
	},
	standard_international: {
		en: 'Standard shipping',
		da: 'Standard shipping',
	},
	standard_denmark: {
		en: 'Standard shipping',
		da: 'Standard shipping',
	},

	information: {
		en: 'Information',
		da: '__information',
	},
	you_are_receiving_this: {
		en: `You are receiving this email because you have placed an order on <a href="http://www.kuraitis.dk">www.kuraitis.dk</a>`,
		da: '__you_are_receiving_this',
	},
}

const transformText = (str, type) => {
	switch (type) {
		case 'uppercase':
			return str.toUpperCase()
		case 'lowercase':
			return str.toLowerCase()
		case 'capitalize':
			return str.charAt(0).toUpperCase() + str.slice(1)
		default:
			return str
	}
}

export const translate = (str = '#UNDEFINED#', locale, transform = null, data = {}) => {
	if (str.toLowerCase() in translations) {
		if (typeof translations[str.toLowerCase()][locale] === 'function') {
			return transformText(translations[str.toLowerCase()][locale](data), transform)
		} else {
			return transformText(translations[str.toLowerCase()][locale], transform)
		}
	} else {
		return transformText(str, transform)
	}
}
