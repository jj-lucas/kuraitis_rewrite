import Router from 'next/router'
import NProgress from 'nprogress'
import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Nav } from '.'
import { Cart, Footer, GlobalStyle, Header, Meta } from '../../components'
import { CartContext, theme } from '../../lib'

const Wrapper = styled.div`
	display: flex;
`
const LeftDrawer = styled.aside`
	left: ${props => (props.open ? 0 : '-200px')};
	position: fixed;

	width: 200px;

	transition: left 0.1s ease-in;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		display: none;
	}
	a {
		display: block;

		font-size: ${props => props.theme.typography.fs.lg};
		padding: 1rem 2rem;
	}
`
const RightDrawer = styled.aside`
	right: ${props => (props.open ? 0 : '-200px')};
	position: fixed;

	width: 400px;

	transition: right 0.1s ease-in;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		display: none;
	}
`
const InnerWrapper = styled.div`
	width: 100%;
	position: ${props => (props.drawerOpen ? 'fixed' : 'relative')};

	transform: translateX(
		${props => (props.drawerOpen === 'left' ? '200px' : props.drawerOpen === 'right' ? '-400px' : 0)}
	);
	transition: all 0.1s ease-in;

	background: white;
	color: var(--black);

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		width: 100%;
	}
`
const HorizontalNav = styled(Nav)`
	display: none;

	border-top: 1px solid #ebebeb;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		display: block;
	}
`

const Overlay = styled.div`
	position: fixed;
	pointer-events: ${props => (props.active ? 'auto' : 'none')};
	background: black;
	width: 100vw;
	height: 100vh;
	opacity: 0;
	transition: opacity ${props => `${props.theme.transition.durations.long} ${props.theme.transition.types.easeInOut}`};

	${props => props.active && `opacity: 0.5;`}
`

const Page = props => {
	const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
	const [rightDrawerOpen, setRightDrawerOpen] = useState(false)
	const { cartOpen, setCartOpen } = React.useContext(CartContext)

	const toggleLeftDrawer = () => {
		setLeftDrawerOpen(!leftDrawerOpen)
	}
	const toggleRightDrawer = () => {
		setRightDrawerOpen(!rightDrawerOpen)
	}

	Router.onRouteChangeStart = () => {
		NProgress.start()
	}
	Router.onRouteChangeComplete = () => {
		NProgress.done()
		setLeftDrawerOpen(false)
		setRightDrawerOpen(false)
	}
	Router.onRouteChangeError = () => {
		NProgress.done()
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Meta />
			<Wrapper>
				<LeftDrawer open={leftDrawerOpen}>
					<Nav />
				</LeftDrawer>
				<InnerWrapper drawerOpen={leftDrawerOpen ? 'left' : rightDrawerOpen ? 'right' : false}>
					<Header
						leftDrawerOpen={leftDrawerOpen}
						rightDrawerOpen={rightDrawerOpen}
						toggleLeftDrawer={toggleLeftDrawer}
						toggleRightDrawer={toggleRightDrawer}>
						<HorizontalNav />
					</Header>
					{props.children}
					<Footer />
				</InnerWrapper>
				<RightDrawer open={rightDrawerOpen}></RightDrawer>
				<Overlay active={cartOpen} onClick={e => setCartOpen(false)} />
				<Cart />
			</Wrapper>
		</ThemeProvider>
	)
}
export { Page }
