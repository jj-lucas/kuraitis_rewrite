import * as React from 'react'
import styled from 'styled-components'

/*
Example usage

import Icon from './Icon'
<Icon name="alert" size="lg" />
*/

const icons = {
	alert: (
		<path d="M11.997 1.95c1.049 0 2.021.548 2.568 1.449l8.478 14.154a3 3 0 01-2.576 4.5H3.516a3 3 0 01-2.557-4.514l8.47-14.14a3.002 3.002 0 012.568-1.449zm0 2a1 1 0 00-.854.48l-8.46 14.123a1 1 0 00.844 1.5h16.929a1 1 0 00.863-1.486L12.852 4.43a1 1 0 00-.855-.481zm-.707 11.396a1 1 0 111.414 1.414 1 1 0 01-1.414-1.414zm.707-7.293a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1z" />
	),
	add: (
		<path d="M11 13H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4z" fillRule="evenodd" />
	),
	checkmark: (
		<path
			d="m8.54311504 12.3835735-5.28442482-5.36473346-3.25869022 3.30821326 8.54311504 8.6729467 15.45688496-15.69178673-3.2586902-3.30821327z"
			transform="translate(0 2)"
		/>
	),
	cross: (
		<path
			d="M10.54 11.95l-5.61-5.6a1 1 0 0 1 1.41-1.42l5.61 5.61L17.3 5.2a1 1 0 0 1 1.42 1.42l-5.34 5.33 5.7 5.7a1 1 0 0 1-1.41 1.42l-5.7-5.7-5.98 5.97a1 1 0 0 1-1.42-1.41l5.98-5.98z"
			fillRule="nonzero"
		/>
	),
	inactive: (
		<path d="M.293.293a1 1 0 011.414 0l22 22a1 1 0 01-1.414 1.414l-4.468-4.466A11.089 11.089 0 0112 21c-3.38 0-6.339-1.632-8.855-4.316a20.492 20.492 0 01-2.25-2.891 15.188 15.188 0 01-.79-1.346 1 1 0 01.014-.92 19.45 19.45 0 014.45-5.544L.292 1.707a1 1 0 010-1.414zm5.694 7.109a17.45 17.45 0 00-3.844 4.601 18.513 18.513 0 002.462 3.313C6.776 17.632 9.255 19 11.984 19a9.07 9.07 0 004.387-1.214l-2.322-2.321A4 4 0 018.535 9.95zM12 3c3.38 0 6.339 1.632 8.855 4.316a20.492 20.492 0 012.25 2.891c.385.596.649 1.065.79 1.346a1 1 0 01-.013.918 19.5 19.5 0 01-2.277 3.363 1 1 0 01-1.53-1.288 17.5 17.5 0 001.783-2.548 18.513 18.513 0 00-2.463-3.314C17.224 6.368 14.745 5 11.998 5a8.12 8.12 0 00-1.87.214 1 1 0 01-.456-1.948A10.116 10.116 0 0112 3zm-1.972 8.442a1.999 1.999 0 002.53 2.53z" />
	),
}

const StyledIcon = styled.svg`
	width: ${props => props.theme.sizes.icons[props.size]};

	${({ rounded }) =>
		rounded &&
		`
	    border-radius: 100%;
    `}

	${props =>
		props.inverted &&
		`
        background-color: ${props.theme.colors.gray};
        fill: ${props.theme.colors.lightGray};
    `}
    
	${props =>
		props.positive &&
		`
        background-color: ${props.theme.colors.gray};
        fill: ${props.theme.colors.lightGray};
    `}
	${props =>
		props.negative &&
		`
        background-color: ${props.theme.colors.gray};
        fill: ${props.theme.colors.lightGray};
    `}
`

const Icon = props => (
	<StyledIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		{icons[props.name]}
	</StyledIcon>
)

Icon.defaultProps = {
	size: 'md',
	rounded: false,
	inverted: false,
}

export { Icon }
