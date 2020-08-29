import React from 'react'
import { useQuery, gql } from '@apollo/client'
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
			sorting
		}
	}
`

const ItemsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 30px;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 0;
	}
`

const Center = styled.div`
	text-align: center;
`

const StyledTile = styled.a`
	transition: all 0.25s ${props => props.theme.transition.cubic};
	border: 1px solid ${props => props.theme.colors.lightGray};
	color: ${props => props.theme.colors.black};

	.cta {
		display: none;
	}
	img {
		width: 100%;
		display: block;
		transition: transform 0.25s ${props => props.theme.transition.cubic};
	}
	.outer {
		padding: 0;

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			& {
				padding: 0 30px 30px;
			}
		}
	}
	.inner {
		width: 100%;
		overflow: hidden;
	}

	&:hover {
		background: ${props => props.theme.colors.lightGray};
		img {
			transform: scale(1.05) translateZ(0);
		}
	}

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		.cta {
			display: block;
		}
	}
`

const Tile = props => (
	<StyledTile href="#">
		<span>
			<h3>{props.name}</h3>
		</span>
		<div className="outer">
			<div className="inner">
				<img src={`/images/categories/${'etuier'}.jpg`} alt={props.name} />
			</div>
		</div>
	</StyledTile>
)

const CategoriesList = () => {
	const language = useContext(LanguageContext)
	const { loading, error, data } = useQuery(ALL_CATEGORIES_QUERY)

	if (loading) return <p>Loading..</p>

	return (
		<Center>
			<ItemsList>
				{data.categories.map(item => (
					<Tile key={item.id} name={item[`name_${language}`]} image={item[`slug_da`]} />
				))}
			</ItemsList>
		</Center>
	)
}

export default CategoriesList
