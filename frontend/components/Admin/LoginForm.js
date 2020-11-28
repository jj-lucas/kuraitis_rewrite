import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { CURRENT_USER_QUERY, DisplayError } from '../../components'

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			id
			email
			name
		}
	}
`

const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [signIn, { data, loading, error }] = useMutation(SIGNIN_MUTATION)

	return (
		<>
			<form
				method="post"
				onSubmit={async e => {
					e.preventDefault()
					await signIn({ variables: { email, password }, refetchQueries: [{ query: CURRENT_USER_QUERY }] }).catch(
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

