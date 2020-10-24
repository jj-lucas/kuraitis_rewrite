import { useRouter } from 'next/router'
import { Checkout, ContentSection, Page } from '../../components'
import { withCart, withCurrency, withLocale } from '../../lib'

const CheckoutPage = props => {
	const router = useRouter()
	const { code, lang } = router.query
	return (
		<Page>
			<ContentSection>
				<Checkout />
			</ContentSection>
		</Page>
	)
}

export default withLocale(withCurrency(withCart(CheckoutPage)))
