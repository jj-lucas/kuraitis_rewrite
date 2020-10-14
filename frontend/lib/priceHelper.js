const prettyPrice = (amount, currency) => {
	switch (currency) {
		case 'DKK':
			return `${amount},- DKK`
		case 'USD':
			return `${amount} $`
		case 'EUR':
			return `${amount} €`
		case 'GBP':
			return `${amount} £`
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
