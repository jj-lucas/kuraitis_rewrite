import App from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'
import Page from '../components/Page'
import 'normalize.css'
import { Query } from 'react-apollo'
import { LANGUAGE_QUERY } from '../components/LanguageSelector'
import { LanguageProvider } from '../lib/languageContext'

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
				<Query query={LANGUAGE_QUERY}>
					{({ data: { language } }) => (
						<LanguageProvider value={language}>
							<Page>
								<Component {...pageProps} />
							</Page>
						</LanguageProvider>
					)}
				</Query>
			</ApolloProvider>
		)
	}
}

export default withData(MyApp)
