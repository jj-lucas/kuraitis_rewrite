import React from 'react'
import Meta from './Meta'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import { Header } from '../components'

const theme = {
	black: '#393939',
	blue: '#0394fc',
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
			regular: 400,
			semibold: 600,
			bold: 700,
		},
	},
}

const StyledPage = styled.div`
	background: white;
	color: ${props => props.theme.black};
`

const Inner = styled.div`
	margin: 0 auto;
`

injectGlobal`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

    html {
        box-sizing: border-box;
        font-size: 10px;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        font-style: normal;
    }
    *, *:before, *:after  {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: ${theme.typography.fs.base};
        line-height: 1.5;
    }
    a {
        text-decoration: none;
        color: ${theme.blue};
    }

`
const Page = props => (
	<ThemeProvider theme={theme}>
		<StyledPage>
			<Meta />
			<Header />
			<Inner>{props.children}</Inner>
		</StyledPage>
	</ThemeProvider>
)
export default Page
