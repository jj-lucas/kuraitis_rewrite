import App from 'next/app'
import Page from '../components/Page'
import 'normalize.css'
import { LanguageProvider } from '../lib/languageContext'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { apiUrlDev, apiUrlProd } from '../config'
import { gql } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

class MyApp extends App {
	constructor(props) {
		super(props)

		this.setLanguage = language => {
			this.setState(state => ({
				language,
			}))
		}

		this.state = {
			language: 'da',
			setLanguage: language => this.setLanguage(language),
		}
	}

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
				<LanguageProvider value={this.state}>
					<Page>
						<Component {...pageProps} />
					</Page>
				</LanguageProvider>
			</ApolloProvider>
		)
	}
}

export default MyApp
