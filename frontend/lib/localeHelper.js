import React, { Component } from 'react'
import Error from 'next/error'
import { getDisplayName } from 'next/dist/next-server/lib/utils'
import { LocaleProvider } from './localeContext'

const locales = ['da', 'en']

const languageNames = {
	en: 'English',
	da: 'Dansk',
}

const WithLocale = WrappedPage => {
	const withLocale = ({ locale, ...pageProps }) => {
		if (!locale) {
			return <Error statusCode={404} />
		}
		return (
			<LocaleProvider lang={locale}>
				<WrappedPage {...pageProps} />
			</LocaleProvider>
		)
	}

	const getInitialProps = async ctx => {
		let pageProps = {}
		if (WrappedPage.getInitialProps) {
			pageProps = await WrappedPage.getInitialProps(ctx)
		}
		if (typeof ctx.query.lang !== 'string' || !isLocale(ctx.query.lang)) {
			return { ...pageProps, locale: undefined }
		}
		return { ...pageProps, locale: ctx.query.lang }
	}
	withLocale.getInitialProps = getInitialProps
	withLocale.displayName = `withLang(${getDisplayName(WrappedPage)})`

	return withLocale
}

const isLocale = locale => {
	return locales.includes(locale)
}

const getInitialLocale = () => {
	const localSetting = localStorage.getItem('locale')
	if (localSetting && isLocale(localSetting)) {
		console.log('getting language from localStorage')
		return localSetting
	}

	const [browserSetting] = navigator.language.split('-')
	if (isLocale(browserSetting)) {
		console.log('getting language from browserSetting')
		return browserSetting
	}

	console.log('using default')
	return 'da'
}

export { locales, languageNames, isLocale, getInitialLocale }
export default WithLocale
