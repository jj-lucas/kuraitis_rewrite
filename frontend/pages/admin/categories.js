import { PageAdmin } from '../../components'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'

const ALL_CATEGORIES_QUERY = gql`
	query ALL_CATEGORIES_QUERY {
		categories {
			id
			slug_da
			slug_en
			name_da
			name_en
			sorting
		}
	}
`

const StyledList = styled.ul`
	overflow: auto;
`
const StyledCategory = styled.li`
	width: 200px;
	float: left;
	padding: 10px;
`

const AdminCategoriesPage = () => {
	const { loading, error, data } = useQuery(ALL_CATEGORIES_QUERY)
	const categories = data && data.categories
	console.log(categories)
	return (
		<PageAdmin>
			<h1>Category editor</h1>
			<StyledList>
				{categories &&
					categories.map(category => <StyledCategory key={category.slug_en}>{category.name_en}</StyledCategory>)}
			</StyledList>
		</PageAdmin>
	)
}

export default AdminCategoriesPage
