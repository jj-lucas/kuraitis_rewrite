import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { apiUrlDev, apiUrlProd } from '../config'

function createClient({ headers }) {
	return new ApolloClient({
		uri: process.env.NODE_ENV === 'development' ? apiUrlDev : apiUrlProd,
		request: operation => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include',
				},
				headers,
			})
		},
		// local data
		clientState: {
			resolvers: {},
			defaults: {
				language: 'da',
			},
		},
	})
}

export default withApollo(createClient)
