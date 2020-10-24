import { About, ContentSection, Page, Slider } from '../../components'
import { withCart, withCurrency, withLocale } from '../../lib'

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

export default withLocale(withCurrency(withCart(AboutPage)))
