import { ContentSection, ProductView, Page } from '../../../../components'
import { withLocale, withCurrency, withCart } from '../../../../lib'
import { useRouter } from 'next/router'

const ProductPage = props => {
	const router = useRouter()
	const { code, lang } = router.query
	return (
		<Page>
			<ContentSection>
				<ProductView code={code} />
			</ContentSection>
		</Page>
	)
}

export default withLocale(withCurrency(withCart(ProductPage)))
