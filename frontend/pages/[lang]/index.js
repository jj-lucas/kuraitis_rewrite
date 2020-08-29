import Homepage from '../../components/Homepage'
import withLocale from '../../lib/localeHelper'
import Page from '../../components/Page'

const Home = props => {
	return (
		<Page>
			<Homepage />
		</Page>
	)
}

export default withLocale(Home)
