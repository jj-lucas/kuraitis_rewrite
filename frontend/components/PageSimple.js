import { GlobalStyle, Header, ContentSection } from '../components'
import { ThemeProvider } from 'styled-components'
import theme from '../lib/theme'

const PageSimple = props => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header></Header>
			<ContentSection>{props.children}</ContentSection>
		</ThemeProvider>
	)
}

export { PageSimple }
