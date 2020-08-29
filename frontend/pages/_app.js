import App from 'next/app'
import 'normalize.css'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { apiUrlDev, apiUrlProd } from '../config'
import { ApolloProvider } from '@apollo/client'

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		// this exposes the query to the user
		pageProps.query = ctx.query
		return { pageProps }
	}
	render() {
		const { Component, pageProps } = this.props

		const client = new ApolloClient({
			uri: process.env.NODE_ENV === 'development' ? apiUrlDev : apiUrlProd,
			cache: new InMemoryCache(),
		})

		return (
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		)
	}
}

export default MyApp
