import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Meta, Header, Footer, GlobalStyle, Cart } from '../../components'
import { Nav } from '.'
import { theme } from '../../lib'

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
		padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.base};
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

const Page = props => {
	const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
	const [rightDrawerOpen, setRightDrawerOpen] = useState(false)

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
				<Cart />
			</Wrapper>
		</ThemeProvider>
	)
}
export { Page }
