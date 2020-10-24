import Link from 'next/link'
import { MdClose, MdMenu } from 'react-icons/md'
import styled from 'styled-components'
import { Toolbox } from './Toolbox'

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
const Left = styled.span`
	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		display: none;
	}
`
const Center = styled.span`
	a {
		display: inline-flex;

		align-items: center;

		color: var(--black);
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
	margin: 1rem;
`
const Burger = styled.div`
	margin: 1rem;

	svg {
		margin-top: 2rem;
		margin-left: 1rem;
		cursor: pointer;
	}
`

const Header = props => {
	return (
		<StyledHeader>
			<Inner>
				<Left>
					<Burger onClick={props.toggleLeftDrawer}>
						{props.leftDrawerOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
					</Burger>
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
					<Toolbox />
				</Right>

				{props.children}
			</Inner>
		</StyledHeader>
	)
}

export { Header }
