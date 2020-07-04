import Link from 'next/link'
import Items from '../components/Test'

const Products = props => (
	<div>
		<p>Productss</p>
		<Items />
		<Link href="/">
			<a>Home {process.env.NODE_ENV}</a>
		</Link>
	</div>
)

export default Products
