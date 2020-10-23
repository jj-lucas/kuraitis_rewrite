import styled from 'styled-components'

const StyledHeader = styled.header`
	background-color: var(--lightGray);
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
const Center = styled.span`
	p {
		max-width: 100%;
		text-align: center;
	}
	small {
		margin: 10px;
		display: block;

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			display: inline-block;
		}
	}
`

const Footer = props => (
	<StyledHeader>
		<Inner>
			<Center>
				<p>
					<small>© 2020, Sergio Kuraitis - Naturligt Design. CVR: 32220649</small>
					<small>Næstildvej 22, 7870 Roslev, Denmark | sergio@kuraitis.dk</small>
				</p>
			</Center>
		</Inner>
	</StyledHeader>
)

export { Footer }
