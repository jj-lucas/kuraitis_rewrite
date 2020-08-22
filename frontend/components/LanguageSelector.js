import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const LANGUAGE_QUERY = gql`
	query {
		language @client
	}
`

const languages = [
	{ id: 'da', label: 'Dansk' },
	{ id: 'en', label: 'English' },
]

const Language = styled.a`
	color: ${props => (props.selected ? props.theme.colors.black : props.theme.colors.blue)};
`

const LanguageSelector = () => (
	<Query query={LANGUAGE_QUERY}>
		{({ data, client }) => (
			<div>
				{languages.map(language => (
					<Language
						selected={language.id === data.language}
						key={language.id}
						href="#"
						data-language={language.id}
						onClick={() => client.writeData({ data: { language: language.id } })}>
						{language.label}
					</Language>
				))}
			</div>
		)}
	</Query>
)

export { LANGUAGE_QUERY }
export default LanguageSelector
