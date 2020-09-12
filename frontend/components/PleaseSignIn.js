import { LoginForm, CURRENT_USER_QUERY } from '../components'
import { useQuery } from '@apollo/client'

const PleaseSignIn = props => {
	const { data, loading } = useQuery(CURRENT_USER_QUERY)

	if (loading) return <p>Loading..</p>

	if (data && !data.me) return <LoginForm />

	return props.children
}

export { PleaseSignIn }
