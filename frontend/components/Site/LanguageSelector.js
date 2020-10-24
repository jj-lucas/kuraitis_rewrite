import { useRouter } from 'next/router'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import styled from 'styled-components'
import { languages } from '../../config'
import { LocaleContext } from '../../lib'

const localeIdToCountryCode = id => {
	switch (id) {
		case 'da':
			return 'dk'
		default:
			return 'gb'
	}
}

const StyledLanguageSelector = styled.span`
	vertical-align: top;
	img {
		margin-right: 10px;
		cursor: pointer;
	}
`

const LanguageSelector = () => {
	const router = useRouter()
	const { locale } = React.useContext(LocaleContext)

	const handleLocaleChange = React.useCallback(
		id => {
			const regex = new RegExp(`^/(${languages.map(lang => lang.id).join('|')})`)
			router.push(router.pathname, router.asPath.replace(regex, `/${id}`))
		},
		[router]
	)

	return (
		<StyledLanguageSelector>
			{languages.map(locale => (
				<ReactCountryFlag
					key={locale.id}
					countryCode={localeIdToCountryCode(locale.id)}
					svg
					onClick={e => {
						e.preventDefault()
						handleLocaleChange(locale.id)
					}}
					style={{
						width: '25px',
						height: '25px',
					}}
				/>
			))}
		</StyledLanguageSelector>
	)
}

export { LanguageSelector }
