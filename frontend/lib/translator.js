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
	add_to_cart: {
		en: 'Add to cart',
		da: 'Læg i indkøbskurv',
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
		en: 'THe return right does not include customized products',
		da: 'Returret inkluderer ikke tilpassede produkter',
	},
}

export const translate = (str, locale) => {
	if (str.toLowerCase() in translations) {
		return translations[str.toLowerCase()][locale]
	} else {
		return str
	}
}
