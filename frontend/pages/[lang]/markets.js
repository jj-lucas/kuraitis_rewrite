import ContentSection from '../../components/ContentSection'
import Markets from '../../components/Markets'
import withLocale from '../../lib/localeHelper'
import Page from '../../components/Page'

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
