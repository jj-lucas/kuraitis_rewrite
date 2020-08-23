import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'
import { GlobalStyle } from './GlobalStyle'
import Meta from './Meta'
import { Header } from './Header'
import Footer from './Footer'
import Nav from './Nav'
import theme from '../lib/theme'

const Wrapper = styled.div`
	display: flex;
`
const LeftDrawer = styled.aside`
	width: 200px;
	left: ${props => (props.open ? 0 : '-200px')};
	position: fixed;
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
	width: 200px;
	right: ${props => (props.open ? 0 : '-200px')};
	position: fixed;
	transition: right 0.1s ease-in;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		display: none;
	}
`
const InnerWrapper = styled.div`
	width: 100%;
	transform: translateX(
		${props => (props.drawerOpen === 'left' ? '200px' : props.drawerOpen === 'right' ? '-200px' : 0)}
	);
	position: ${props => (props.drawerOpen ? 'fixed' : 'relative')};
	transition: all 0.1s ease-in;

	background: white;
	color: ${props => props.theme.colors.black};

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		width: 100%;
	}
`
const Content = styled.section`
	margin: 0 auto;
	padding: 10px;
	max-width: ${props => props.theme.maxWidth};
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
					<Content>{props.children}</Content>
					<Footer />
				</InnerWrapper>
				<RightDrawer open={rightDrawerOpen}></RightDrawer>
			</Wrapper>
		</ThemeProvider>
	)
}
export default Page
