import { GlobalStyle, LoginForm, Header, ContentSection, CURRENT_USER_QUERY } from '../../components'
import { ThemeProvider } from 'styled-components'
import theme from '../../lib/theme'
import { useQuery } from '@apollo/client'

const LoginPage = () => {
	const { data } = useQuery(CURRENT_USER_QUERY)

	if (data && data.me) window.location = '/admin'

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header></Header>
			<ContentSection>
				<LoginForm />
			</ContentSection>
		</ThemeProvider>
	)
}

export default LoginPage
