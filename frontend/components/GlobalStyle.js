import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Oswald', sans-serif;
        font-weight: ${props => props.theme.typography.fw.regular};
        font-style: normal;
        font-size: ${props => props.theme.typography.fs.base};
        line-height: 1.5;
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
