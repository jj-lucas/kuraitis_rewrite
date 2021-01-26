export const makeMultiPrice = (dkk, conversionRates) => {
	return {
		DKK: dkk ? parseInt(dkk, 10) : null,
		USD: dkk ? parseInt('' + parseInt(dkk, 10) * conversionRates.USD, 10) : null,
		EUR: dkk ? parseInt('' + parseInt(dkk, 10) * conversionRates.EUR, 10) : null,
		GBP: dkk ? parseInt('' + parseInt(dkk, 10) * conversionRates.GBP, 10) : null,
	}
}

export const prettyPrice = (amount, currency) => {
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
