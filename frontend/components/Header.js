import styled from 'styled-components'

const StyledHeader = styled.header`
	display: flex;

	flex-wrap: wrap;

	margin: 0 auto;
	max-width: ${props => props.theme.maxWidth};
`
const HeaderLogo = styled.div`
	display: flex;

	justify-content: center;
	flex-grow: 1;

	a {
		display: flex;

		align-items: center;

		color: ${props => props.theme.black};
		font-size: ${props => props.theme.typography.fs.lg};
	}

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		justify-content: start;
	}

	small {
		display: none;

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			display: inline;
		}
	}
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
		<HeaderLogo>
			<a href="/">
				<Logo src="http://placekitten.com/80/80" />
				<span>
					Sergio Kuraitis<small> - Naturligt design</small>
				</span>
			</a>
		</HeaderLogo>
		<UtilsBar>Utils Bar</UtilsBar>
		<Nav>Nav</Nav>
	</StyledHeader>
)

export { Header }
