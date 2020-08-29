import styled from 'styled-components'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import { LocaleContext } from '../lib/localeContext'

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

const links = {
	en: [
		{ label: 'Home', path: '/' },
		{ label: 'Products', path: '/products' },
		{ label: 'About', path: '/about' },
		{ label: 'Markets', path: '/markets' },
		{ label: 'FAQ', path: '/faq' },
		{ label: 'Contact', path: '/contact' },
	],
	da: [
		{ label: 'Hjem', path: '/' },
		{ label: 'Produkter', path: '/products' },
		{ label: 'Om Sergio', path: '/about' },
		{ label: 'Markeder', path: '/markets' },
		{ label: 'FAQ', path: '/faq' },
		{ label: 'Kontakt', path: '/contact' },
	],
}

const Nav = ({ className, children }) => {
	const { locale } = React.useContext(LocaleContext)
	return (
		<StyledNav className={className}>
			{links[locale].map(link => (
				<NavLink key={link.path} href={`/${locale}${link.path}`}>
					<a>{link.label}</a>
				</NavLink>
			))}
		</StyledNav>
	)
}

export default Nav
