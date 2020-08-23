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

const LanguageSelector = () => (
	<Query query={LANGUAGE_QUERY}>
		{({ data, client }) => (
			<Container>
				{languages.map(language => (
					<Language
						selected={language.id === data.language}
						key={language.id}
						id={language.id}
						onClick={() => client.writeData({ data: { language: language.id } })}
						alt={language.label}
					/>
				))}
			</Container>
		)}
	</Query>
)

export { LANGUAGE_QUERY }
export default LanguageSelector
