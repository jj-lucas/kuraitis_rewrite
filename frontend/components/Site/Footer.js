import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { LocaleContext, translate } from '../../lib'
const unescape = require('lodash.unescape')
import { GrStar as StarIcon } from 'react-icons/gr'

const QUOTE_QUERY = gql`
	query QUOTE_QUERY {
		quote {
			message
			creation_tsz
		}
	}
`

const StyledHeader = styled.header`
	background-color: var(--lightGray);
`
const Inner = styled.div`
	display: flex;

	flex-wrap: wrap;

	margin: 0 auto;
	max-width: ${props => props.theme.maxWidth};

	span {
		flex: 1;
	}
`
const Center = styled.span`
	p {
		max-width: 100%;
		text-align: center;
	}
	.quote {
		max-width: 70%;
		margin: 1rem auto;
	}
	small {
		margin: 10px;
		display: block;

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			display: inline-block;
		}
	}
`

const Footer = props => {
	const [quote, setQuote] = useState('')
	const [creationDate, setCreationDate] = useState('')
	const { data } = useQuery(QUOTE_QUERY, {})
	const { locale } = React.useContext(LocaleContext)

	useEffect(() => {
		console.log(quote)
		if (!data || !data.quote) {
			return
		}
		setQuote(unescape(data.quote.message))
		setCreationDate(format(new Date(parseInt(data.quote.creation_tsz, 10) * 1000), 'dd/MM/yyyy'))
	}, [data])

	return (
		<StyledHeader>
			<Inner>
				<Center>
					{quote && (
						<p className="quote">
							<StarIcon />
							<StarIcon />
							<StarIcon />
							<StarIcon />
							<StarIcon />
							<br />"{quote}"
							<br />
							{translate('customer_on', locale)} {creationDate} -{' '}
							<a href="https://www.etsy.com/dk-en/shop/SergioKuraitis#reviews" target="_blank">
								{translate('customer_read_more', locale)}
							</a>
						</p>
					)}
					<p>
						<small>© 2020, Sergio Kuraitis - Naturligt Design. CVR: 32220649</small>
						<small>Næstildvej 22, 7870 Roslev, Denmark | sergio@kuraitis.dk</small>
					</p>
				</Center>
			</Inner>
		</StyledHeader>
	)
}

export { Footer }
