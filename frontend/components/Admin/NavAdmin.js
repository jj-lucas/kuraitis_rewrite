import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { LogoutButton } from '../../components'

const links = [
	{ label: 'Dashboard', path: '/admin' },
	{ label: 'Categories', path: '/admin/categories' },
	{ label: 'Products', path: '/admin/products' },
	{ label: 'Reports', path: '/admin/reports' },
]

const StyledNav = styled.nav`
	width: 100%;
	font-family: ${props => props.theme.typography.ff.oswald};

	a {
		display: inline-block;

		padding: 1rem;

		color: var(--gray);
		transition: color 0.1s ease-in, background-color 0.1s ease-in;
		text-transform: uppercase;

		&:hover {
			color: var(--darkGray);
		}

		&.selected {
			color: var(--blue);
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
