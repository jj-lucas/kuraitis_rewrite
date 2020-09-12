import { Markets, ContentSection, Page } from '../../components'
import withLocale from '../../lib/localeHelper'

const MarketsPage = props => {
	return (
		<Page>
			<ContentSection>
				<Markets />
			</ContentSection>
		</Page>
	)
}

export default withLocale(MarketsPage)
