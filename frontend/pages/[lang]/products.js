import Link from 'next/link'
import { Items, Page } from '../../components'
import withLocale from '../../lib/localeHelper'

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
