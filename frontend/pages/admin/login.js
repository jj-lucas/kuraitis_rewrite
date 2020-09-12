import { GlobalStyle } from '../../components/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import LoginForm from '../../components/LoginForm'
import { Header } from '../../components/Header'
import theme from '../../lib/theme'
import ContentSection from '../../components/ContentSection'
import { CURRENT_USER_QUERY } from '../../components/User'
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
