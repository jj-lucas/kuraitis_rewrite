import { GlobalStyle, Header, ContentSection, PleaseSignIn, NavAdmin } from '.'
import { ThemeProvider } from 'styled-components'
import theme from '../lib/theme'

const PageAdmin = props => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header />
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