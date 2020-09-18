import React from 'react'
import { useRouter } from 'next/router'
import { locales, languageNames } from '../../lib/localeHelper'
import { LocaleContext } from '../../lib/localeContext'

const LanguageSelector = () => {
	const router = useRouter()
	const { locale } = React.useContext(LocaleContext)

	const handleLocaleChange = React.useCallback(
		e => {
			const regex = new RegExp(`^/(${locales.join('|')})`)
			router.push(router.pathname, router.asPath.replace(regex, `/${e.target.value}`))
		},
		[router]
	)

	return (
		<select value={locale} onChange={handleLocaleChange}>
			{locales.map(locale => (
				<option key={locale} value={locale}>
					{languageNames[locale]}
				</option>
			))}
		</select>
	)
}

export { LanguageSelector }
