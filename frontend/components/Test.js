import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const ALL_USERS_QUERY = gql`
	query ALL_USERS_QUERY {
		users {
			id
			name
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
		<Query query={ALL_USERS_QUERY}>
			{({ data, error, loading }) => {
				if (error) return <p>Error</p>
				if (loading) return <p>Loading.. </p>
				return (
					<ItemsList>
						{data.users.map(item => (
							<p key={item.id}>{item.name}</p>
						))}
					</ItemsList>
				)
			}}
		</Query>
	</Center>
)

export default Items
