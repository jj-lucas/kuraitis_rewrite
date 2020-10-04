const prettyPrice = (dkk, lang, currency) => {
	switch (currency) {
		case 'DKK':
			return `${dkk},- DKK`
		case 'USD':
			return `${dkk} $`
	}
	return ''
}

export { prettyPrice }
