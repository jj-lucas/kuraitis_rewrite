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
		en: 'Order Total',
		da: 'Ordretotal',
	},
	free_delivery: {
		en: 'Free delivery',
		da: 'Gratis levering',
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
	order_summary: {
		en: 'Order summary',
		da: '__order_summary',
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

export const translate = (str = 'HHHHEY', locale, transform = null) => {
	if (str.toLowerCase() in translations) {
		return transformText(translations[str.toLowerCase()][locale], transform)
	} else {
		return transformText(str, transform)
	}
}
