import { ContentSection, Page, Slider } from '../../components'
import { withCart, withCurrency, withLocale } from '../../lib'

const CookiesPage = props => {
	return (
		<Page>
			<ContentSection>
				<script
					id="CookieDeclaration"
					src="https://consent.cookiebot.com/8acec528-3104-4e78-8c7a-fb958f7ceff1/cd.js"
					type="text/javascript"
					async></script>
			</ContentSection>
		</Page>
	)
}

export default withLocale(withCurrency(withCart(CookiesPage)))
