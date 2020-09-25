import { ContentSection, Page } from '../../../components'
import { withLocale } from '../../../lib'
import { useRouter } from 'next/router'

const CategoryPage = props => {
	const router = useRouter()
	const { slug } = router.query
	return (
		<Page>
			<ContentSection>
				<h1>{slug}</h1>
			</ContentSection>
		</Page>
	)
}

export default withLocale(CategoryPage)
