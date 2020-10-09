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

export { prettyPrice }
