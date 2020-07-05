import styled from 'styled-components'
import Link from 'next/link'

const StyledNav = styled.div`
	width: 100%;

	a {
		display: inline-block;

		padding: ${props => props.theme.spacing.sm};

		color: ${props => props.theme.colors.gray};
		transition: color 0.1s ease-in, background-color 0.1s ease-in;
		text-transform: uppercase;

		&:hover {
			color: ${props => props.theme.colors.darkGray};
		}
	}
`

const Nav = ({ className, children }) => (
	<StyledNav className={className}>
		<Link href="/">
			<a>Home</a>
		</Link>
		<Link href="/products">
			<a>Products</a>
		</Link>
		<Link href="/">
			<a>About</a>
		</Link>
		<Link href="/">
			<a>Markets</a>
		</Link>
		<Link href="/">
			<a>Markets</a>
		</Link>
		<Link href="/">
			<a>Contact</a>
		</Link>
	</StyledNav>
)

export { Nav }
