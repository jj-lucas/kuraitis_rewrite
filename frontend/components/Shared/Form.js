import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`

const Form = styled.form`
	box-shadow: ${props => props.theme.boxShadow.sm};
	background: ${props => props.theme.colors.lightGray};
	border: 5px solid white;
	padding: ${props => props.theme.spacing.base};
	label {
		display: block;
		margin-bottom: ${props => props.theme.spacing.sm};
	}
	input,
	textarea,
	select {
		width: 100%;
		padding: ${props => props.theme.spacing.xs};
		border: 1px solid ${props => props.theme.colors.gray};
		&:focus {
			outline: 0;
			border-color: ${props => props.theme.colors.blue};
		}
	}
	input[type='checkbox'] {
		width: 15px;
		height: 15px;
		margin: 3px 10px 3px 0;
	}
	button,
	input[type='submit'] {
		width: auto;
		background: ${props => props.theme.colors.blue};
		color: white;
		border: 0;
		padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.base};
		margin: 0 ${props => props.theme.spacing.base} 0 0;

		&.warning {
			background: ${props => props.theme.colors.warning};
		}
	}
	fieldset {
		border: 0;
		padding: 0;

		&[disabled] {
			opacity: 0.5;
		}
		&::before {
			height: 5px;
			content: '';
			display: block;
		}
		&[aria-busy='true']::before {
			background-size: 50% auto;
			animation: ${loading} 0.5s linear infinite;
			background-image: linear-gradient(to right, #0394fc 0%, #f8f8f8 50%, #0394fc 100%);
		}
	}
`

export { Form }
