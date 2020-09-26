import styled from 'styled-components'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const StyledGrid = styled.ul`
	list-style: none;
	display: grid;
	grid-template-columns: ${props => '1fr '.repeat(props.columns || 5)};
	grid-gap: 30px;
`

const SortableList = SortableContainer(({ columns, children }) => {
	return <StyledGrid columns={columns}>{children}</StyledGrid>
})

const StyledCard = styled.div`
	background: ${props => props.theme.colors.lightGray};
	padding: 0 0 ${props => props.theme.spacing.base};

	h3 {
		margin: 0;
	}
	img {
		width: 100%;
	}
	.meta {
		padding: 0 ${props => props.theme.spacing.base};
	}
`
const SortableItem = SortableElement(props => <StyledCard {...props}>{props.children}</StyledCard>)

export { SortableList, SortableItem }
