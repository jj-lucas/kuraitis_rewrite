import { gql, useMutation } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import { CURRENT_USER_QUERY, User } from '../../components'

const SIGNOUT_MUTATION = gql`
	mutation SIGNOUT_MUTATION {
		signOut {
			message
		}
	}
`

const StyledButton = styled.button`
	float: right;
	margin: 1rem;
`

const Button = () => {
	const [signOut, { data, loading, error }] = useMutation(SIGNOUT_MUTATION)

	return (
		<StyledButton
			onClick={e => {
				signOut({
					refetchQueries: [
						{
							query: CURRENT_USER_QUERY,
						},
					],
				})
			}}>
			Sign out
		</StyledButton>
	)
}

const LogoutButton = () => <User>{({ currentUser }) => currentUser && <Button />}</User>

export { LogoutButton }

