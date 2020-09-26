import styled from 'styled-components'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const StyledGrid = styled.ul`
	list-style: none;
	display: grid;
	padding: 0;
	grid-template-columns: 1fr 1fr;
	grid-gap: 30px;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		grid-template-columns: ${props => '1fr '.repeat(props.columns || 5)};
	}
`

const SortableList = SortableContainer(({ columns, children }) => {
	return <StyledGrid columns={columns}>{children}</StyledGrid>
})

const SortableItem = SortableElement(props => <>{props.children}</>)

export { SortableList, SortableItem }
