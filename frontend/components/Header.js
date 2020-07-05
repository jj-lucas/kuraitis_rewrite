import styled from 'styled-components'

const StyledHeader = styled.header`
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
		display: flex;

		align-items: center;

		color: ${props => props.theme.black};
		font-size: ${props => props.theme.typography.fs.lg};
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
const HeaderLogo = styled.div`
	display: flex;

	justify-content: center;
	flex-grow: 1;
`
const Logo = styled.img`
	margin: ${props => props.theme.spacing.sm};
`
const UtilsBar = styled.div`
	margin: ${props => props.theme.spacing.sm};
`
const Nav = styled.div`
	width: 100%;
	margin: ${props => props.theme.spacing.sm};
`

const Header = () => (
	<StyledHeader>
		<Left></Left>
		<Center>
			<a href="/">
				<Logo src="http://placekitten.com/80/80" />
				<span>
					Sergio Kuraitis<small> - Naturligt design</small>
				</span>
			</a>
		</Center>
		<Right>
			<UtilsBar>Utils Bar</UtilsBar>
		</Right>

		<Nav>Nav</Nav>
	</StyledHeader>
)

export { Header }
