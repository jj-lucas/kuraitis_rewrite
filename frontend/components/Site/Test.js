import { gql, useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import { User } from '../../components'

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
const Items = () => {
	const { loading, error, data } = useQuery(ALL_USERS_QUERY)

	if (error)
		return (
			<Center>
				<p>Error</p>
			</Center>
		)
	if (loading)
		return (
			<Center>
				<p>Loading.. </p>
			</Center>
		)

	return (
		<Center>
			<User>
				{({ currentUser }) =>
					console.log(currentUser) || (
						<>
							<p>{currentUser ? `Current user: ${currentUser.name}` : 'Logged out'}</p>
							<ItemsList>
								{data.users.map(item => (
									<p key={item.id}>{item.name}</p>
								))}
							</ItemsList>
						</>
					)
				}
			</User>
		</Center>
	)
}
export { Items }

