import { About, ContentSection, Slider, Page } from '../../components'
import { withLocale } from '../../lib'

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
