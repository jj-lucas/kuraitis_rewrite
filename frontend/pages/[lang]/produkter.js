import { ContentSection, ProductsList, Page } from '../../components'
import { withCurrency, withLocale } from '../../lib'

const Products = props => (
	<Page>
		<ContentSection>
			<ProductsList />
		</ContentSection>
	</Page>
)

export default withLocale(withCurrency(Products))
