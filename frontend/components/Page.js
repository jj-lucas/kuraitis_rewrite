import React from 'react'
import Meta from './Meta'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Header } from '../components/Header'

const theme = {
	colors: {
		lightGray: '#f8f8f8',
		gray: '#1a1a1a99',
		darkGray: '#1a1a1a',
		black: '#393939',
		blue: '#0394fc',
	},
	maxWidth: '1260px',
	bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
	breakpoints: {
		xs: '375px',
		sm: '680px',
		md: '1024px',
		lg: '1260px',
		xl: '1600px',
	},
	spacing: {
		base: '20px',
		xs: '5px', // /4
		sm: '10px', // /2
		lg: '40px', // *2
		xl: '60px', // *3
		xxl: '100px', // *5
	},
	typography: {
		fs: {
			h1: '36px',
			h2: '24px',
			h3: '16px',
			h4: '16px',

			lg: '20px',
			base: '16px',
			sm: '14px',
			xs: '12px',
		},
		fw: {
			light: 300,
			regular: 400,
			semibold: 600,
			bold: 700,
		},
	},
}

const StyledPage = styled.div`
	background: white;
	color: ${props => props.theme.colors.black};
`

const Inner = styled.div`
	margin: 0 auto;
`

const GlobalStyle = createGlobalStyle`
    
    body {
        font-family: 'Oswald', sans-serif;
        font-weight: ${theme.typography.fw.regular};
        font-style: normal;
        font-size: ${theme.typography.fs.base};
        line-height: 1.5;
    }
    a {
        text-decoration: none;
        color: ${theme.colors.blue};
    }
    #nprogress .bar {
        background: ${theme.colors.blue};
        height:3px;
    }
    #nprogress .spinner-icon {
        border-top-color: ${theme.colors.blue};
        border-left-color: ${theme.colors.blue};
    }    
    #nprogress .peg {
        box-shadow: 0 0 10px ${theme.colors.blue}, 0 0 5px ${theme.colors.blue};
    }

`
const Page = props => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<StyledPage>
			<Meta />
			<Header />
			<Inner>{props.children}</Inner>
		</StyledPage>
	</ThemeProvider>
)
export default Page
