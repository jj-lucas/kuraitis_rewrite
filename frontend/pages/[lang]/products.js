import Link from 'next/link'
import Items from '../../components/Test'
import withLocale from '../../lib/localeHelper'
import Page from '../../components/Page'

const Products = props => (
	<Page>
		<p>Products</p>
		<Items />
		<Link href="/">
			<a>Home {process.env.NODE_ENV}</a>
		</Link>
	</Page>
)

export default withLocale(Products)
