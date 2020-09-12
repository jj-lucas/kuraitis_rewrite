import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY, User } from '.'

const SIGNOUT_MUTATION = gql`
	mutation SIGNOUT_MUTATION {
		signout {
			message
		}
	}
`
const Button = () => {
	const [signout, { data, loading, error }] = useMutation(SIGNOUT_MUTATION)

	return (
		<a
			href="#"
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
		</a>
	)
}

const LogoutButton = () => <User>{({ me }) => me && <Button />}</User>

export { LogoutButton }
