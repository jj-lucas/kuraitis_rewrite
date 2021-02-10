const translations = {
	// Mails
	subject_order_confirmation: {
		en: data => `Thank you for your order from Kuraitis.dk (#${data.id})`,
		da: data => `Tak for din ordre fra Kuraitis.dk (#${data.id})`,
	},
	subject_shipping: {
		en: data => `Your order from Kuraitis.dk has been shipped (#${data.id})`,
		da: data => `Din ordre fra Kuraitis.dk er sendt (#${data.id})`,
	},
	// Shipment mail
	order_shipped: {
		en: 'Your order has been shipped',
		da: 'Din bestilling er blevet afsendt',
	},
	shipped_today: {
		en: data => `Your order #${data.id} placed on the ${data.date} is on its way.`,
		da: data => `Din ordre #${data.id}, der blev afgivet den ${data.date}, er afsendt.`,
	},
	track_package: {
		en: 'Track your package',
		da: 'Følg din pakke',
	},
	additional_questions: {
		en: data =>
			`For any additional question check out the FAQ page <a href="${data.url}/en/faq">here</a>.<br />
			You are welcome to contact Sergio directly for any question/comment regarding your order.`,
		da: data =>
			`For yderligere spørgsmål, se FAQ side <a href="${data.url}/en/faq">her</a>.<br />
			Du er velkommen til at kontakte Sergio direkte for spørgsmål / kommentarer vedrørende din ordre.`,
	},

	// Order confirmation mail
	thank_you_for_order: {
		en: 'Thank you for your order',
		da: 'Tak for din ordre',
	},
	you_will_receive_mail: {
		en:
			"You'll receive an email when your items have been shipped. <br>If you have any questions, feel free to respond to this mail.",
		da:
			'Du modtager en e-mail, når dine varer er sendt. <br> Hvis du har spørgsmål, er du velkommen til at svare på denne mail.',
	},
	view_order_status: {
		en: 'View order status',
		da: 'Se ordrestatus',
	},
	summary: {
		en: 'summary',
		da: 'summary',
	},
	order_nr: {
		en: 'Order #',
		da: 'Bestillingsnummer',
	},
	order_date: {
		en: 'Order Date',
		da: 'Bestillingsdato',
	},
	order_total: {
		en: 'Order total (VAT included)',
		da: 'Bestilt i alt (inkl moms)',
	},
	shipping_address: {
		en: 'Shipping address',
		da: 'Leveringsadresse',
	},
	items_ordered: {
		en: 'Items ordered',
		da: 'Varer bestilt',
	},
	items_name: {
		en: 'name',
		da: 'navn',
	},
	items_sku: {
		en: 'SKU',
		da: 'SKU',
	},
	items_price: {
		en: 'price',
		da: 'pris',
	},
	subtotal: {
		en: 'Subtotal',
		da: 'Subtotal',
	},
	subtotal_item: {
		en: 'item',
		da: 'vare',
	},
	subtotal_items: {
		en: 'items',
		da: 'varer',
	},
	comments: {
		en: 'Comments about your order',
		da: 'Kommentarer til din ordre',
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
		da: 'Information',
	},
	you_are_receiving_this: {
		en: `You are receiving this email because you have placed an order on <a href="http://www.kuraitis.dk">www.kuraitis.dk</a>`,
		da:
			'Du modtager denne e-mail, fordi du har afgivet en ordre på <a href="http://www.kuraitis.dk">www.kuraitis.dk</a>',
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
