import { ContentSection, ProductsList, Page } from '../../../components'
import { withLocale, withCurrency } from '../../../lib'
import { useRouter } from 'next/router'

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

export default withLocale(withCurrency(CategoryProducts))
