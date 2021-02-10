import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { User } from '../../components'
import { CurrencyContext, LocaleContext, translate } from '../../lib'

const StyledNav = styled.nav`
	width: 100%;

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
		/*{ label: 'Markets', path: '/markets' },*/
		{ label: 'FAQ', path: '/faq' },
		{ label: 'Contact', path: '/contact' },
	],
	da: [
		{ label: 'Hjem', path: '/' },
		{ label: 'Produkter', path: '/produkter' },
		{ label: 'Om Sergio', path: '/om-sergio' },
		/*{ label: 'Markeder', path: '/markeder' },*/
		{ label: 'FAQ', path: '/faq' },
		{ label: 'Kontakt', path: '/contact' },
	],
}

const CurrencySelector = styled.select`
	margin-left: 1rem;
`

const MobileCurrency = styled.p`
	padding: 0 2rem;
	color: var(--gray);

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		display: none;
	}
`

const Nav = ({ className, children }) => {
	const { locale } = React.useContext(LocaleContext)
	const { currency, setCurrency } = React.useContext(CurrencyContext)

	const onChangeCurrency = e => {
		setCurrency(e.target.value)
		localStorage.setItem('currency', e.target.value)
	}

	return (
		<StyledNav className={className}>
			{links[locale].map(link => (
				<NavLink key={link.path} href={`/${locale}${link.path}`}>
					<a>{link.label}</a>
				</NavLink>
			))}
			<User>
				{({ currentUser }) =>
					currentUser && (
						<>
							{currentUser.permissions.map(permission => permission.name).includes('ADMIN') && (
								<Link href="/admin">
									<a className="admin">Admin</a>
								</Link>
							)}
						</>
					)
				}
			</User>
			<MobileCurrency>
				{translate('currency', locale)}:
				<CurrencySelector onChange={onChangeCurrency} value={currency}>
					<option value="DKK">DKK</option>
					<option value="USD">$ USD</option>
					<option value="EUR">€ EUR</option>
					<option value="GBP">£ GBP</option>
				</CurrencySelector>
			</MobileCurrency>
		</StyledNav>
	)
}

export { Nav }
