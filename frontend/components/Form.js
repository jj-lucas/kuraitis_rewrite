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
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	background: rgba(0, 0, 0, 0.02);
	border: 5px solid white;
	padding: 20px;
	label {
		display: block;
		margin-bottom: 1rem;
	}
	input,
	textarea,
	select {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid black;
		&:focus {
			outline: 0;
			border-color: ${props => props.theme.colors.blue};
		}
	}
	button,
	input[type='submit'] {
		width: auto;
		background: red;
		color: white;
		border: 0;
		padding: 0.5rem 1.2rem;
	}
	fieldset {
		border: 0;
		padding: 0;

		&[disabled] {
			opacity: 0.5;
		}
	}
`

export { Form }
