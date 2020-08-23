import React from 'react'
import styled from 'styled-components'
import { useContext } from 'react'
import LanguageContext from '../lib/languageContext'
import { datesToRange } from '../lib/dateHelper'

const markets = [
	{
		start: '25/5/2019',
		end: '27/5/2019',
		name: 'Parisermarked - Latiner Festival 2019',
		url: 'google.dk',
		location: 'Aarhus',
	},
	{
		start: '9/6/2019',
		end: '10/6/2019',
		name: 'Trapholt Pinsemarked',
		url: 'google.dk',
		location: 'Kolding',
	},
	{
		start: '14/6/2019',
		end: '16/6/2019',
		name: 'Beddingen Kunsthåndværkermarked',
		url: 'google.dk',
		location: 'Hundested Havn',
	},
	{
		start: '3/8/2019',
		end: '4/8/2019',
		name: 'Kildemarkedet',
		url: 'google.dk',
		location: 'Tisvilde',
	},
	{
		start: '10/8/2019',
		end: '10/8/2019',
		name: 'Kunsthånværkermarked i Odder',
		url: 'google.dk',
		location: 'Odder',
	},
	{
		start: '17/8/2019',
		end: '17/8/2019',
		name: 'Kunsthånværkermarked i Hjørring',
		url: 'google.dk',
		location: 'Hjørring',
	},
	{
		start: '6/12/2019',
		end: '7/12/2019',
		name: 'Trapholt Julemarked',
		url: 'google.dk',
		location: 'Kolding',
	},
]

const Picture = styled.img`
	display: block;

	margin: auto;
	max-width: 100%;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		float: left;
		margin: 0 20px 0 0;
	}
`

const List = styled.ul`
	padding: 0;
	li {
		margin: 10px;
		list-style: none;
	}
	strong {
		display: block;

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			display: inline;
		}
	}
`

const Markets = () => {
	const language = useContext(LanguageContext)

	return (
		<div style={{ overflow: 'auto' }}>
			<h1>Kommende markeder 2019</h1>
			<p>
				<Picture src="/images/markets.jpg" />
				<List>
					{markets.map(market => (
						<li key={market.name}>
							<strong>{datesToRange(market.start, market.end, language)}</strong>{' '}
							<a target="blank" href={market.url.substr(0, 7) === 'http://' ? market.url : 'http://' + market.url}>
								{market.name}
							</a>{' '}
							/ {market.location}
						</li>
					))}
				</List>
			</p>
		</div>
	)
}

export default Markets
