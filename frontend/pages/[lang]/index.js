import { Homepage, Page } from '../../components'
import { withCart, withCurrency, withLocale } from '../../lib'

const Home = props => {
	return (
		<Page>
			<Homepage />
		</Page>
	)
}

export default withLocale(withCurrency(withCart(Home)))
