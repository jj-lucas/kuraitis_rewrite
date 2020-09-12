import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY, User } from '.'
import styled from 'styled-components'

const SIGNOUT_MUTATION = gql`
	mutation SIGNOUT_MUTATION {
		signout {
			message
		}
	}
`

const StyledButton = styled.button`
	float: right;
	margin: ${props => props.theme.spacing.sm};
`

const Button = () => {
	const [signout, { data, loading, error }] = useMutation(SIGNOUT_MUTATION)

	return (
		<StyledButton
			onClick={e => {
				signout({
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

const LogoutButton = () => <User>{({ me }) => me && <Button />}</User>

export { LogoutButton }
