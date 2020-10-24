import { ContentSection, Markets, Page } from '../../components'
import { withCart, withCurrency, withLocale } from '../../lib'

const MarketsPage = props => {
	return (
		<Page>
			<ContentSection>
				<Markets />
			</ContentSection>
		</Page>
	)
}

export default withLocale(withCurrency(withCart(MarketsPage)))
