import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
		--lightGray: #f8f8f8;
		--lightishGray: #aaaaaa;
		--gray: #1a1a1a99;
		--darkGray: #1a1a1a;
		--black: #393939;
		--blue: #0394fc;
		--negative: #ff421e;
		--positive: #9adb60;
		--info: #fbd01e;
		--warning: #ffad1e;
    }
    html {
        font-size: 10px;
    }
    body {
	    background-color: var(--lightGray);
        font-family: ${props => props.theme.typography.ff.oswald};
        font-weight: ${props => props.theme.typography.fw.regular};
        font-style: normal;
        font-size: ${props => props.theme.typography.fs.base};
        line-height: 1.5;
    }
    .admin {
        font-family: ${props => props.theme.typography.ff.droid};
        font-weight: ${props => props.theme.typography.fw.regular};
    }
	h1 {
		font-size: ${props => props.theme.typography.fs.lg};
        
        @media (min-width: ${props => props.theme.breakpoints.sm}) {
		    font-size: ${props => props.theme.typography.fs.h1};
        }
	}
	h2 {
		font-size: ${props => props.theme.typography.fs.h2};
	}
	h3 {
		font-size: ${props => props.theme.typography.fs.h3};
	}
	p {
		max-width: ${props => props.theme.maxLengthLine};
		font-family: ${props => props.theme.typography.ff.droid};
    }
    a {
        text-decoration: none;
        color: var(--blue);
    }
    button {
        letter-spacing: 1px;
    }
    #nprogress .bar {
        background: var(--blue);
        height:3px;
    }
    #nprogress .spinner-icon {
        border-top-color: var(--blue);
        border-left-color: var(--blue);
    }    
    #nprogress .peg {
        box-shadow: 0 0 10px var(--blue), 0 0 5px var(--blue);
    }
`

export { GlobalStyle }
