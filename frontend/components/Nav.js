import styled from 'styled-components'
import Link from 'next/link'

const StyledNav = styled.div`
	width: 100%;
	margin: ${props => props.theme.spacing.sm};
`

const Nav = () => (
	<StyledNav>
		<Link href="/">
			<a>Home</a>
		</Link>
		<Link href="/products">
			<a>Products</a>
		</Link>
	</StyledNav>
)

export { Nav }
