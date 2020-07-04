import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const ALL_ITEMS_QUERY = gql`
	query ALL_ITEMS_QUERY {
		items {
			id
			title
			price
			description
			image
			largeImage
		}
	}
`

const ItemsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
`

const Center = styled.div`
	text-align: center;
`
const Items = () => (
	<Center>
		<Query query={ALL_ITEMS_QUERY}>
			{({ data, error, loading }) => {
				if (error) return <p>Error</p>
				if (loading) return <p>Loading.. </p>
				return (
					<ItemsList>
						{data.items.map(item => (
							<p key={item.id}>{item.title}</p>
						))}
					</ItemsList>
				)
			}}
		</Query>
	</Center>
)

export default Items
