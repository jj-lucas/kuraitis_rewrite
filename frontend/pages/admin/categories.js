import { PageAdmin } from '../../components'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import Link from 'next/link'

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
	list-style: none;
`
const StyledTile = styled.li`
	overflow: auto;

	h3 {
	}
	img {
		float: left;

		margin: ${props => props.theme.spacing.sm};
		width: 100px;
		min-width: 100px;
	}
`

const Tile = ({ data }) => (
	<StyledTile>
		<Link href={`/admin/category?id=${data.id}`}>
			<a>
				<img src={`/images/categories/etuier.jpg`} />
				<h3>{data.name_da}</h3>
			</a>
		</Link>
	</StyledTile>
)

const AdminCategoriesPage = () => {
	const { loading, error, data } = useQuery(ALL_CATEGORIES_QUERY)
	const categories = data && data.categories
	return (
		<PageAdmin>
			<h1>Category editor</h1>
			<StyledList>
				{categories && categories.map(category => <Tile key={category.slug_en} data={category} />)}
			</StyledList>
		</PageAdmin>
	)
}

export default AdminCategoriesPage
