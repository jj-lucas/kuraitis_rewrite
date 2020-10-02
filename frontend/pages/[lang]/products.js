import { ContentSection, ProductsList, Page } from '../../components'
import { withLocale } from '../../lib'

const Products = props => (
	<Page>
		<ContentSection>
			<ProductsList />
		</ContentSection>
	</Page>
)

export default withLocale(Products)
