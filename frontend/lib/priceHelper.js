const prettyPrice = (dkk, lang, currency) => {
	if (currency == 'DKK') {
		return `${dkk},- DKK`
	}
	return ''
}

export { prettyPrice }
