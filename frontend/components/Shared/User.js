import { gql, useQuery } from '@apollo/client'

/*
Usage example

import User from './User'
<User>
    {({ currentUser }) => (
        <>{currentUser.name}</>
    )}
</User>
*/

const CURRENT_USER_QUERY = gql`
	query CURRENT_USER_QUERY {
		currentUser {
			id
			name
			email
			permissions {
				name
			}
		}
	}
`

const User = props => {
	const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
	if (error) return <p>Error</p>
	if (loading) return <></>

	// make permissions easier to parse
	if (data.permissions ) {
		data.permissions = data.permissions.map(permission => permission.name)
	}
	return props.children(data)
}

export { User, CURRENT_USER_QUERY }

