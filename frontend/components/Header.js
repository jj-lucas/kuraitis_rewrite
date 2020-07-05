import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Nav } from '../components/Nav'

Router.onRouteChangeStart = () => {
	NProgress.start()
}
Router.onRouteChangeComplete = () => {
	NProgress.done()
}
Router.onRouteChangeError = () => {
	NProgress.done()
}

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
const StyledNav = styled(Nav)`
	display: none;

	border-top: 1px solid #ebebeb;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		display: block;
	}
`
const Header = () => (
	<StyledHeader>
		<Inner>
			<Left>
				<Burger>Burger</Burger>
			</Left>
			<Center>
				<Link href="/">
					<a>
						<Logo src="http://placekitten.com/80/80" />
						<span>
							Sergio Kuraitis<small> - Naturligt design</small>
						</span>
					</a>
				</Link>
			</Center>
			<Right>
				<UtilsBar>Utils Bar</UtilsBar>
			</Right>

			<StyledNav />
		</Inner>
	</StyledHeader>
)

export { Header }
