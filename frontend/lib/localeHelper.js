import React from 'react'
import Error from 'next/error'
import { getDisplayName } from 'next/dist/next-server/lib/utils'
import { LocaleProvider } from './localeContext'
import { languages } from '../config'

const withLocale = WrappedPage => {
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
	return languages.map(lang => lang.id).includes(locale)
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
	return languages[0].id
}

export { isLocale, getInitialLocale, withLocale }
