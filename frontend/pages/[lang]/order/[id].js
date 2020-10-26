import { useRouter } from 'next/router'
import { ContentSection, Order, Page } from '../../../components'
import { withCart, withCurrency, withLocale } from '../../../lib'

const OrderPage = props => {
	const router = useRouter()
	const { id } = router.query
	return (
		<Page>
			<ContentSection>
				<Order orderId={id} />
			</ContentSection>
		</Page>
	)
}

export default withLocale(withCurrency(withCart(OrderPage)))
