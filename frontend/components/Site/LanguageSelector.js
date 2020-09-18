import React from 'react'
import { useRouter } from 'next/router'
import { LocaleContext } from '../../lib/localeContext'
import { languages } from '../../config'

const LanguageSelector = () => {
	const router = useRouter()
	const { locale } = React.useContext(LocaleContext)

	const handleLocaleChange = React.useCallback(
		e => {
			const regex = new RegExp(`^/(${languages.map(lang => lang.id).join('|')})`)
			router.push(router.pathname, router.asPath.replace(regex, `/${e.target.value}`))
		},
		[router]
	)

	return (
		<select value={locale} onChange={handleLocaleChange}>
			{languages.map(locale => (
				<option key={locale.id} value={locale.id}>
					{locale.pretty}
				</option>
			))}
		</select>
	)
}

export { LanguageSelector }
