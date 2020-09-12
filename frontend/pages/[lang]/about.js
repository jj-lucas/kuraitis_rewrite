import ContentSection from '../../components/ContentSection'
import { About } from '../../components'
import Slider from '../../components/Slider'
import withLocale from '../../lib/localeHelper'
import Page from '../../components/Page'

const AboutPage = props => {
	return (
		<Page>
			<Slider slides={['hero2']} />
			<ContentSection>
				<About />
			</ContentSection>
		</Page>
	)
}

export default withLocale(AboutPage)
