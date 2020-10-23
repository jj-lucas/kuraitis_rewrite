import styled from 'styled-components'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import { LocaleContext } from '../../lib'
import { User } from '../../components'

const StyledNav = styled.nav`
	width: 100%;

	a {
		display: inline-block;

		padding: ${props => props.theme.spacing.sm};

		color: var(--gray);
		transition: color 0.1s ease-in, background-color 0.1s ease-in;
		text-transform: uppercase;

		&:hover {
			color: var(--darkGray);
		}

		&.selected {
			color: var(--blue);
		}

		&.admin {
			color: var(--warning);
		}
	}
`
const NavLink = ({ href, children }) => {
	const router = useRouter()

	let className = children.props.className || ''

	if (router && router.pathname === '/[lang]' + href.replace(/^\/.*?\//gi, '/')) {
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
		{ label: 'TESTS', path: '/tests' },
	],
	da: [
		{ label: 'Hjem', path: '/' },
		{ label: 'Produkter', path: '/produkter' },
		{ label: 'Om Sergio', path: '/om-sergio' },
		{ label: 'Markeder', path: '/markeder' },
		{ label: 'FAQ', path: '/faq' },
		{ label: 'Kontakt', path: '/contact' },
		{ label: 'TESTS', path: '/tests' },
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
			<User>
				{({ me }) =>
					me && (
						<>
							{me.permissions.includes('ADMIN') && (
								<Link href="/admin">
									<a className="admin">Admin</a>
								</Link>
							)}
						</>
					)
				}
			</User>
		</StyledNav>
	)
}

export { Nav }
