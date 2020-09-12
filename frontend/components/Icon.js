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
	checkmark: (
		<path
			d="m8.54311504 12.3835735-5.28442482-5.36473346-3.25869022 3.30821326 8.54311504 8.6729467 15.45688496-15.69178673-3.2586902-3.30821327z"
			transform="translate(0 2)"
		/>
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
