import React from 'react'
import styled from 'styled-components'
import { useContext } from 'react'
import LanguageContext from '../lib/languageContext'

const languages = [
	{ id: 'da', label: 'Dansk' },
	{ id: 'en', label: 'English' },
]

const Container = styled.div`
	margin: 5px;
`

const Language = styled.button`
	width: 23px;
	height: 17px;

	margin: 5px;
	border: none;
	outline: none;

	background: url('/icons/${props => props.id}.png');
	cursor: ${props => (props.selected ? 'auto' : 'pointer')};
`

const LanguageSelector = () => {
	const context = useContext(LanguageContext)
	const currentLanguage = context.language

	return (
		<Container>
			{languages.map(language => (
				<Language
					selected={language.id === currentLanguage}
					key={language.id}
					id={language.id}
					onClick={() => context.setLanguage(language.id)}
					alt={language.label}
				/>
			))}
		</Container>
	)
}

export default LanguageSelector
