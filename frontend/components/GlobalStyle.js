import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
	    background-color: ${props => props.theme.colors.lightGray};
        font-family: ${props => props.theme.typography.ff.oswald};
        font-weight: ${props => props.theme.typography.fw.regular};
        font-style: normal;
        font-size: ${props => props.theme.typography.fs.base};
        line-height: 1.5;
    }
	h1 {
		font-size: ${props => props.theme.typography.fs.lg};
        
        @media (min-width: ${props => props.theme.breakpoints.sm}) {
		    font-size: ${props => props.theme.typography.fs.h1};
        }
	}
	p {
		max-width: ${props => props.theme.maxLengthLine};
		font-family: ${props => props.theme.typography.ff.droid};
    }
    a {
        text-decoration: none;
        color: ${props => props.theme.colors.blue};
    }
    #nprogress .bar {
        background: ${props => props.theme.colors.blue};
        height:3px;
    }
    #nprogress .spinner-icon {
        border-top-color: ${props => props.theme.colors.blue};
        border-left-color: ${props => props.theme.colors.blue};
    }    
    #nprogress .peg {
        box-shadow: 0 0 10px ${props => props.theme.colors.blue}, 0 0 5px ${props => props.theme.colors.blue};
    }
`

export { GlobalStyle }
