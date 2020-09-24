import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { DisplayError, CURRENT_USER_QUERY } from '../../components'

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		signin(email: $email, password: $password) {
			id
			email
			name
		}
	}
`

const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [signin, { data, loading, error }] = useMutation(SIGNIN_MUTATION)

	return (
		<>
			<form
				method="post"
				onSubmit={async e => {
					e.preventDefault()
					await signin({ variables: { email, password }, refetchQueries: [{ query: CURRENT_USER_QUERY }] }).catch(
						error => {
							console.log(error)
						}
					)
				}}>
				<fieldset>
					<h2>Sign in</h2>
					<DisplayError error={error} />
					<label htmlFor="email">
						email
						<input
							type="email"
							name="email"
							placeholder="email"
							value={email}
							onChange={e => {
								setEmail(e.target.value)
							}}
						/>
					</label>
					<label htmlFor="password">
						Password
						<input
							type="password"
							name="password"
							placeholder=""
							value={password}
							onChange={e => {
								setPassword(e.target.value)
							}}
						/>
					</label>
					<button type="submit">Sign in!</button>
				</fieldset>
			</form>
		</>
	)
}

export { LoginForm }
