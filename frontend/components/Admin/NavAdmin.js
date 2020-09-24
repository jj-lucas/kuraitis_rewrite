import styled from 'styled-components'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import { LogoutButton } from '../../components'

const links = [
	{ label: 'Dashboard', path: '/admin' },
	{ label: 'Categories', path: '/admin/categories' },
	{ label: 'Reported images', path: '/admin/reportedImages' },
	{ label: 'Products', path: '/admin/products' },
]

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

const NavAdmin = ({ className, children }) => {
	return (
		<StyledNav className={className}>
			{links.map(link => (
				<NavLink key={link.path} href={link.path}>
					<a>{link.label}</a>
				</NavLink>
			))}
			<LogoutButton />
		</StyledNav>
	)
}

export { NavAdmin }
