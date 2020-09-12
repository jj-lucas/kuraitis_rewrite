import styled from 'styled-components'
import Link from 'next/link'
import { LanguageSelector, LogoutButton } from '.'
import { LocaleContext } from '../lib/localeContext'

const StyledHeader = styled.header`
	background-color: ${props => props.theme.colors.lightGray};
`
const Inner = styled.div`
	display: flex;

	flex-wrap: wrap;

	margin: 0 auto;
	max-width: ${props => props.theme.maxWidth};

	span {
		flex: 1;
	}
`
const Left = styled.span`
	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		display: none;
	}
`
const Center = styled.span`
	a {
		display: inline-flex;

		align-items: center;

		color: ${props => props.theme.colors.black};
		font-size: ${props => props.theme.typography.fs.lg};
		font-weight: ${props => props.theme.typography.fw.light};
		text-transform: uppercase;
	}

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		justify-content: start;
		flex-basis: 50% !important;
	}

	small {
		display: none;

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			display: inline;
		}
	}
`
const Right = styled.span`
	text-align: right;
`
const Logo = styled.img`
	margin: ${props => props.theme.spacing.sm};
`
const UtilsBar = styled.div`
	margin: ${props => props.theme.spacing.sm};
`
const Burger = styled.div`
	margin: ${props => props.theme.spacing.sm};
`

const Header = props => {
	const { locale } = React.useContext(LocaleContext)
	return (
		<StyledHeader>
			<Inner>
				<Left>
					<Burger onClick={props.toggleLeftDrawer}>{props.leftDrawerOpen ? 'X' : '='}</Burger>
				</Left>
				<Center>
					<Link href="/">
						<a>
							<Logo src="/logo.png" />
							<span>
								Sergio Kuraitis<small> - Naturligt design</small>
							</span>
						</a>
					</Link>
				</Center>
				<Right>
					{locale && <LanguageSelector />}
					{props.toggleRightDrawer && <UtilsBar onClick={props.toggleRightDrawer}>Utils Bar</UtilsBar>}
				</Right>

				{props.children}
			</Inner>
		</StyledHeader>
	)
}

export { Header }
