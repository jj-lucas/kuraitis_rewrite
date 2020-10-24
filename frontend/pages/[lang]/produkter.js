import { ContentSection, Page, ProductsList } from '../../components'
import { withCart, withCurrency, withLocale } from '../../lib'

const Products = props => (
	<Page>
		<ContentSection>
			<ProductsList />
		</ContentSection>
	</Page>
)

export default withLocale(withCurrency(withCart(Products)))
