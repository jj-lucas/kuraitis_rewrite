const makeMultiPrice = (dkk, conversionRates) => {
	return {
		DKK: dkk ? parseInt(dkk, 10) : null,
		USD: dkk ? parseInt('' + parseInt(dkk, 10) * conversionRates.USD, 10) : null,
		EUR: dkk ? parseInt('' + parseInt(dkk, 10) * conversionRates.EUR, 10) : null,
		GBP: dkk ? parseInt('' + parseInt(dkk, 10) * conversionRates.GBP, 10) : null,
	}
}
module.exports = makeMultiPrice
