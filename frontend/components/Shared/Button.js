import styled from 'styled-components'

const Button = styled.button`
	width: auto;
	color: white;
	background: var(--gray);
	border: 0;
	padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.base};
	margin: 0 ${props => props.theme.spacing.sm} 0 0;

	&[type='submit'] {
		background: var(--blue);
	}
	&.warning {
		background: var(--warning);
		float: right;
	}
`

export { Button }
