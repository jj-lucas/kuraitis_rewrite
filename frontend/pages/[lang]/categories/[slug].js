import { useRouter } from 'next/router'
import { ContentSection, Page, ProductsList } from '../../../components'
import { withCart, withCurrency, withLocale } from '../../../lib'

const CategoryProducts = props => {
	const router = useRouter()
	const { slug } = router.query
	return (
		<Page>
			<ContentSection>
				<ProductsList categorySlug={slug} />
			</ContentSection>
		</Page>
	)
}

export default withLocale(withCurrency(withCart(CategoryProducts)))
