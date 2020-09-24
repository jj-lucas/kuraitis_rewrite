import styled from 'styled-components'

const Button = styled.button`
	width: auto;
	color: white;
	background: ${props => props.theme.colors.gray};
	border: 0;
	padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.base};
	margin: 0 ${props => props.theme.spacing.sm} 0 0;

	&[type='submit'] {
		background: ${props => props.theme.colors.blue};
	}
	&.warning {
		background: ${props => props.theme.colors.warning};
		float: right;
	}
`

export { Button }
