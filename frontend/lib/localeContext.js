import React from 'react'
import { useRouter } from 'next/router'
import { isLocale } from './localeHelper'

export const LocaleContext = React.createContext({
	locale: 'da',
	setLocale: () => null,
})

export const LocaleProvider = ({ lang, children }) => {
	const [locale, setLocale] = React.useState(lang)
	const { query } = useRouter()

	React.useEffect(() => {
		if (locale !== localStorage.getItem('locale')) {
			localStorage.setItem('locale', locale)
		}
	}, [locale])

	React.useEffect(() => {
		if (typeof query.lang === 'string' && locale !== query.lang && isLocale(query.lang)) {
			setLocale(query.lang)
		}
	}, [query.lang, locale])

	return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}
