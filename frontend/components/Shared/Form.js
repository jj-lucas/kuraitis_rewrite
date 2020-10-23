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
	border: 5px solid white;
	label {
		display: block;
		margin-bottom: ${props => props.theme.spacing.sm};
	}
	input,
	textarea,
	select {
		width: calc(100% - 10px); /*matches padding on sides*/
		padding: ${props => props.theme.spacing.xs};
		border: 1px solid var(--gray);
		&:focus {
			outline: 0;
			border-color: var(--blue);
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
	}
	fieldset {
		padding: ${props => props.theme.spacing.base};
		margin: 0 0 7px;
		border: 0;
		background: var(--lightGray);

		h3 {
			margin-top: 0;
		}

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
