import React from 'react'
import { getDisplayName } from 'next/dist/next-server/lib/utils'

export const CurrencyContext = React.createContext({
	currency: '',
	setCurrency: () => null,
})

const CurrencyProvider = ({ children }) => {
	const [currency, setCurrency] = React.useState()

	React.useEffect(() => {
		if (currency && currency !== localStorage.getItem('currency')) {
			localStorage.setItem('currency', currency)
		}
	}, [currency])

	React.useEffect(() => {
		if (localStorage.getItem('currency')) {
			setCurrency(localStorage.getItem('currency'))
		}
	}, [])

	return (
		<CurrencyContext.Provider value={{ currency: currency || 'DKK', setCurrency }}>{children}</CurrencyContext.Provider>
	)
}

const withCurrency = WrappedPage => {
	const withCurrency = ({ currency, ...pageProps }) => {
		return (
			<CurrencyProvider currency={currency}>
				<WrappedPage {...pageProps} />
			</CurrencyProvider>
		)
	}

	withCurrency.displayName = `withCurrency(${getDisplayName(WrappedPage)})`

	return withCurrency
}

export { withCurrency }
