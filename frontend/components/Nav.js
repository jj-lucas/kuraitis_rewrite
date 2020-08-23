import styled from 'styled-components'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import LanguageContext from '../lib/languageContext'

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
	const language = useContext(LanguageContext)
	return (
		<StyledNav className={className}>
			{links[language].map(link => (
				<NavLink key={link.path} href={link.path}>
					<a>{link.label}</a>
				</NavLink>
			))}
		</StyledNav>
	)
}

export { Nav }
