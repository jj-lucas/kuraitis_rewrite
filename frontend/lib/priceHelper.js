const prettyPrice = (amount, currency) => {
	switch (currency) {
		case 'DKK':
			return amount ? `${amount},- DKK` : 'Gratis'
		case 'USD':
			return amount ? `${amount} $` : 'Free'
		case 'EUR':
			return amount ? `${amount} €` : 'Free'
		case 'GBP':
			return amount ? `${amount} £` : 'Free'
	}
	return ''
}

const fromPrice = (hasMultiplePrices, locale) => {
	if (!hasMultiplePrices) return ''

	switch (locale) {
		case 'da':
			return 'fra '
		case 'en':
			return 'from '
	}

	return ''
}

export { prettyPrice, fromPrice }
