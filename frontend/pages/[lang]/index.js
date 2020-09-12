import withLocale from '../../lib/localeHelper'
import { Homepage, Page } from '../../components'

const Home = props => {
	return (
		<Page>
			<Homepage />
		</Page>
	)
}

export default withLocale(Home)
