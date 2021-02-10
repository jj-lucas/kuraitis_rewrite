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

	// Footer
	customer_on: {
		en: 'Customer, ',
		da: 'Klient, ',
	},
	customer_read_more: {
		en: 'Read more reviews',
		da: 'Læs mere feedback',
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
		da: 'Tilpasning',
	},

	// Cart
	no_items_in_cart: {
		en: 'There are no items in your shopping cart',
		da: 'Der er ingen varer i din indkøbskurv',
	},
	your_cart: {
		en: 'Your shopping cart',
		da: 'Din indkøbskurv',
	},
	customization: {
		en: 'Customization',
		da: 'Tilpasning',
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
	to_the_checkout: {
		en: 'Checkout',
		da: 'Til kassen',
	},

	// Checkout
	checkout: {
		en: 'Checkout',
		da: 'Checkout',
	},
	pay: {
		en: 'Proceed to payment',
		da: 'Fortsæt til betaling',
	},
	total: {
		en: 'Total',
		da: 'Total',
	},
	vat_included: {
		en: 'VAT included',
		da: 'inkl. moms',
	},
	order_summary: {
		en: 'Order summary',
		da: 'Ordreoversigt',
	},
	customer_information: {
		en: 'Customer information',
		da: 'Kunde information',
	},
	email: {
		en: 'Email Address',
		da: 'Email adresse',
	},
	shipping_address: {
		en: 'Shipping address',
		da: 'Leveringsadresse',
	},
	name: {
		en: 'Recipient name',
		da: 'Modtagers navn',
	},
	address: {
		en: 'Address',
		da: 'Adresse',
	},
	address2: {
		en: 'Apt, suite, etc.',
		da: 'Apt, suite',
	},
	city: {
		en: 'City',
		da: 'By',
	},
	zip: {
		en: 'ZIP',
		da: 'Postnummer',
	},
	shipping_method: {
		en: 'Shipping method',
		da: 'Fragtmetode',
	},
	comments: {
		en: 'Comments about your order',
		da: 'Kommentarer om din ordre',
	},

	// Order
	your_order: {
		en: 'Your order',
		da: 'Din bestilling',
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
		da: 'Standard levering',
	},
	standard_denmark: {
		en: 'Standard shipping',
		da: 'Standard levering',
	},
	customer_details: {
		en: 'Customer information',
		da: 'Kunde information',
	},
	shipment_status: {
		en: 'Shipment status',
		da: 'Forsendelsesstatus',
	},
	still_in_progress: {
		en: 'Sergio is now making the products you purchased. You will receive an email when your order has been shipped.',
		da: 'Sergio fremstiller nu de produkter, du har købt. Du modtager en e-mail, når din ordre er afsendt.',
	},
	additional_help: {
		en: 'Need additional help?',
		da: 'Brug for yderligere hjælp?',
	},
	order_details: {
		en: 'Order details',
		da: 'Ordre detaljer',
	},
	order_date: {
		en: 'Order date',
		da: 'Bestillingsdato',
	},
	order_id: {
		en: 'Order ID',
		da: 'Ordre ID',
	},
	order_number: {
		en: 'Order #',
		da: 'Bestillingsnummer #',
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
