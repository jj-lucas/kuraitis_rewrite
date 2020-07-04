import Link from 'next/link'

const Home = props => {
	return (
		<div>
			<p>Home</p>
			<Link href="/products">
				<a>Products</a>
			</Link>
		</div>
	)
}

export default Home
