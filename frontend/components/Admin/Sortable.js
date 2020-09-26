import styled from 'styled-components'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const StyledGrid = styled.ul`
	list-style: none;
	display: grid;
	padding: 0;
	grid-template-columns: ${props => '1fr '.repeat(props.columns || 5)};
	grid-gap: 30px;
`

const SortableList = SortableContainer(({ columns, children }) => {
	return <StyledGrid columns={columns}>{children}</StyledGrid>
})

const SortableItem = SortableElement(props => <>{props.children}</>)

export { SortableList, SortableItem }
