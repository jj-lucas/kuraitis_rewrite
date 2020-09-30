import { GlobalStyle, Header, ContentSection, PleaseSignIn, NavAdmin, Meta } from '../../components'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../lib'

const PageAdmin = props => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header />
			<Meta />
			<ContentSection className="admin">
				<PleaseSignIn>
					<NavAdmin />
					{props.children}
				</PleaseSignIn>
			</ContentSection>
		</ThemeProvider>
	)
}

export { PageAdmin }
