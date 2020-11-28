import { useQuery } from '@apollo/client'
import { CURRENT_USER_QUERY, LoginForm } from '../../components'

const PleaseSignIn = props => {
	const { data, loading } = useQuery(CURRENT_USER_QUERY)

	if (loading) return <p>Loading..</p>

	if (data && !data.currentUser) return <LoginForm />

	return props.children
}

export { PleaseSignIn }

