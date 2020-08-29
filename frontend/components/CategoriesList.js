import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { useContext } from 'react'
import LanguageContext from '../lib/languageContext'

const ALL_CATEGORIES_QUERY = gql`
	query ALL_CATEGORIES_QUERY {
		categories {
			id
			slug_da
			slug_en
			name_da
			name_en
			description_da
			description_en
			sorting
		}
	}
`

const ItemsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		grid-template-columns: 1fr 1fr 1fr;
	}
`

const Center = styled.div`
	text-align: center;
`

const StyledTile = styled.a`
	p strong {
		color: ${props => props.theme.colors.black};
		font-size: ${props => props.theme.typography.fs.lg};
		font-weight: ${props => props.theme.typography.fw.light};
		text-transform: uppercase;
	}
	img {
		display: block;
		width: 100%;
		transition: transform 0.25s ${props => props.theme.transition.cubic};
	}
	div {
		width: 100%;
		overflow: hidden;
	}

	&:hover {
		img {
			transform: scale(1.05) translateZ(0);
		}
	}
`

const Tile = props => (
	<StyledTile href="#">
		<p>
			<strong>{props.name}</strong>{' '}
		</p>
		<p> Se alle</p>
		<div>
			<img src={`/images/categories/${'etuier'}.jpg`} />
		</div>
	</StyledTile>
)

const CategoriesList = () => {
	const language = useContext(LanguageContext)
	return (
		<Center>
			<Query query={ALL_CATEGORIES_QUERY}>
				{({ data, error, loading }) => {
					if (error) return <p>Error</p>
					if (loading) return <p>Loading.. </p>
					return (
						<ItemsList>
							{data.categories.map(item => (
								<Tile key={item.id} name={item[`name_${language}`]} image={item[`slug_da`]} />
							))}
						</ItemsList>
					)
				}}
			</Query>
		</Center>
	)
}

export default CategoriesList
