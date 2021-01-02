import { MdClose as CloseIcon } from 'react-icons/md'
import styled from 'styled-components'

/*
Usage:

import { Modal } from '../../components'
const [open, setOpen] = React.useState(false)
...

<Modal open={open} setOpen={setOpen} title="Modal title">
    <More complex component with logic />
</Modal>

*/
const StyledModal = styled.div`
	display: block;
	position: fixed;
	z-index: 10;
	width: 600px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	padding: 2rem;
	box-shadow: ${props => props.theme.boxShadow.lg};

	h2 {
		margin-top: 0;
	}

	ul {
		list-style: none;
		display: grid;
		padding: 0;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-gap: 30px;

		a {
			opacity: 0.5;
			transition: opacity ${props => props.theme.transition.durations.short}
				${props => props.theme.transition.types.cubic};

			&:hover {
				opacity: 1;
			}

			&.selected {
				opacity: 1;

				img {
					border-color: gray;
				}
			}
		}

		img {
			width: 100%;
			border: 3px solid white;
		}
	}
`

const StyledCloseIcon = styled(CloseIcon)`
	position: absolute;
	top: 2rem;
	right: 1rem;
	cursor: pointer;
`

const Modal = ({ title, open, setOpen, children }) => {
	if (!open) return null

	return (
		<StyledModal>
			{title && <h2>{title}</h2>}
			{setOpen && <StyledCloseIcon size="30" onClick={() => setOpen(false)} />}
			{children}
		</StyledModal>
	)
}

export { Modal }
