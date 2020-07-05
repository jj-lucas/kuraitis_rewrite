import styled from 'styled-components'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

const StyledNav = styled.nav`
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

		&.selected {
			color: ${props => props.theme.colors.blue};
		}
	}
`
const NavLink = ({ href, children }) => {
	const router = useRouter()

	let className = children.props.className || ''
	if (router && router.pathname === href) {
		className = `${className} selected`
	}

	return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}

const Nav = ({ className, children }) => (
	<StyledNav className={className}>
		<NavLink href="/">
			<a>Home</a>
		</NavLink>
		<NavLink href="/products">
			<a>Products</a>
		</NavLink>
		<NavLink href="/about">
			<a>About</a>
		</NavLink>
		<NavLink href="/markets">
			<a>Markets</a>
		</NavLink>
		<NavLink href="/faq">
			<a>FAQ</a>
		</NavLink>
		<NavLink href="/contact">
			<a>Contact</a>
		</NavLink>
	</StyledNav>
)

export { Nav }
