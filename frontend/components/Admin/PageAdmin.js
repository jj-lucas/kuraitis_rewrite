import { GlobalStyle, Header, ContentSection, PleaseSignIn, NavAdmin, Meta } from '../../components'
import { ThemeProvider } from 'styled-components'
import theme from '../../lib/theme'

const PageAdmin = props => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header />
			<Meta />
			<ContentSection>
				<PleaseSignIn>
					<NavAdmin />
					{props.children}
				</PleaseSignIn>
			</ContentSection>
		</ThemeProvider>
	)
}

export { PageAdmin }
