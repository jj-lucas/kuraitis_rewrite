import { GlobalStyle, Header, ContentSection, PleaseSignIn } from '../../components'
import { ThemeProvider } from 'styled-components'
import theme from '../../lib/theme'

const IndexPage = props => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header></Header>
			<ContentSection>
				<PleaseSignIn>
					<h1>Super secret admin page</h1>
				</PleaseSignIn>
			</ContentSection>
		</ThemeProvider>
	)
}

export default IndexPage
