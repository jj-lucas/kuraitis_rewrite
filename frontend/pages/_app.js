import App from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

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
		const { Component, apollo, pageProps } = this.props

		return (
			<ApolloProvider client={apollo}>
				<Component {...pageProps} />
			</ApolloProvider>
		)
	}
}

export default withData(MyApp)
