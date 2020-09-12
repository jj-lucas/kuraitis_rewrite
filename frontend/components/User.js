import { useQuery, gql } from '@apollo/client'

/*
Usage example

import User from './User'
<User>
    {({ me }) => (
        <>{me.name}</>
    )}
</User>
*/

const CURRENT_USER_QUERY = gql`
	query CURRENT_USER_QUERY {
		me {
			id
			name
			email
			permissions
		}
	}
`

const User = props => {
	const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
	if (error) return <p>Error</p>
	if (loading) return <p>Loading.. </p>
	return props.children(data)
}

export default User
export { CURRENT_USER_QUERY }
