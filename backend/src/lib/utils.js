const makeMultiPrice = (dkk, conversionRates) => {
  return {
    DKK: parseInt(dkk, 10) | null,
    USD: parseInt(parseInt(dkk, 10) * conversionRates.USD, 10) | null,
    EUR: parseInt(parseInt(dkk, 10) * conversionRates.EUR, 10) | null,
    GBP: parseInt(parseInt(dkk, 10) * conversionRates.GBP, 10) | null,
  }
}
module.exports = {
  makeMultiPrice,
}
