import Link from 'next/link'

const Products = props => (
	<div>
		<p>Products</p>
		<Link href="/">
			<a>Home {process.env.NODE_ENV}</a>
		</Link>
	</div>
)

export default Products
