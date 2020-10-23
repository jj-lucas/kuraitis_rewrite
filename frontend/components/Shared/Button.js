import styled from 'styled-components'

const Button = styled.button`
	width: auto;
	color: white;
	background: var(--gray);
	border: 0;
	padding: 1rem 2rem;
	margin: 0 1rem 0 0;

	&[type='submit'] {
		background: var(--blue);
	}
	&.warning {
		background: var(--warning);
		float: right;
	}
`

export { Button }
