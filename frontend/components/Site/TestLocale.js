import React from 'react'
import { useContext } from 'react'
import { LocaleContext } from '../../lib/localeContext'

const Artist = () => {
	const { locale } = useContext(LocaleContext)
	return (
		<div>
			<h1>René Magritte {locale}</h1>
		</div>
	)
}

export { Artist }
