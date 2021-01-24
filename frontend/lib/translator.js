const translations = {
	size: {
		en: 'size',
		da: 'mål',
	},
	color: {
		en: 'color',
		da: 'farve',
	},
	tan: {
		en: 'tan',
		da: 'tan',
	},
	brun: {
		en: 'brown',
		da: 'brun',
	},
	sort: {
		en: 'black',
		da: 'sort',
	},
	currency: {
		en: 'Currency',
		da: 'Valuta',
	},

	// Product page
	add_to_cart: {
		en: 'Add to cart',
		da: 'Læg i indkøbskurv',
	},
	vat_included: {
		en: 'VAT included',
		da: 'inkl moms',
	},
	customization: {
		en: 'Customization',
		da: '__customization',
	},

	// Cart
	no_items_in_cart: {
		en: 'There are no items in your shopping cart',
		da: '__no_items_in_cart',
	},
	your_cart: {
		en: 'Your shopping cart',
		da: 'Din indkøbskurv',
	},
	subtotal: {
		en: 'Order Subtotal',
		da: 'Ordre subtotal',
	},
	free_delivery: {
		en: 'Free delivery in Denmark',
		da: 'Gratis levering i Danmark',
	},
	gift_wrapping: {
		en: 'Gift wrapping',
		da: 'Gift wrapping',
	},
	returns_30_days: {
		en: '30 days return right*',
		da: '30 dages returret*',
	},
	customized_returns: {
		en: 'The return right does not include customized products',
		da: 'Returret inkluderer ikke customiserede produkter',
	},

	// Checkout
	checkout: {
		en: 'Checkout',
		da: '__checkout',
	},
	total: {
		en: 'Total',
		da: '__total',
	},
	vat_included: {
		en: 'VAT included',
		da: 'inkl. moms',
	},
	order_summary: {
		en: 'Order summary',
		da: '__order_summary',
	},
	customer_information: {
		en: 'Customer_information',
		da: '__customer_information',
	},
	email: {
		en: 'Email Address',
		da: '__email',
	},
	shipping_address: {
		en: 'Shipping address',
		da: '__shipping_address',
	},
	name: {
		en: 'Recipient Name',
		da: '__name',
	},
	address: {
		en: 'Address',
		da: '__address',
	},
	address2: {
		en: 'Apt, suite, etc.',
		da: '__address2',
	},
	city: {
		en: 'City',
		da: '__city',
	},
	zip: {
		en: 'ZIP',
		da: '__zip',
	},
	shipping_method: {
		en: 'Shipping method',
		da: '__shipping_method',
	},
	comments: {
		en: 'Comments about your order',
		da: 'Kommentarer om din ordre',
	},

	// Order
	your_order: {
		en: 'Your order',
		da: '__your_order',
	},
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
	customer_details: {
		en: 'Customer information',
		da: '__customer_details',
	},
	shipment_status: {
		en: 'Shipment status',
		da: '__shipment_status',
	},
	still_in_progress: {
		en: 'Sergio is now making the products you purchased. You will receive an email when your order has been shipped.',
		da: '__still_in_progress',
	},
	additional_help: {
		en: 'Need additional help?',
		da: '__additional_help',
	},
	order_details: {
		en: 'Order details',
		da: '__order_details',
	},
	order_date: {
		en: 'Order date',
		da: '__order_date',
	},
	order_id: {
		en: 'Order ID',
		da: '__order_id',
	},
	order_number: {
		en: 'Order #',
		da: '__order_number',
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

export const translate = (str = '#UNDEFINED#', locale, transform = null) => {
	if (str.toLowerCase() in translations) {
		return transformText(translations[str.toLowerCase()][locale], transform)
	} else {
		return transformText(str, transform)
	}
}
