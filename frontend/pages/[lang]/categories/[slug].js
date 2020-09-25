import { ContentSection, Page, CategoryOverview } from '../../../components'
import { withLocale } from '../../../lib'
import { useRouter } from 'next/router'

const CategoryPage = props => {
	const router = useRouter()
	const { slug } = router.query
	return (
		<Page>
			<ContentSection>
				<CategoryOverview slug={slug} />
			</ContentSection>
		</Page>
	)
}

export default withLocale(CategoryPage)
