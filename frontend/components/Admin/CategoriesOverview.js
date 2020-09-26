import { Icon } from '../../components'
import { useQuery, useMutation, gql } from '@apollo/client'
import styled from 'styled-components'
import Link from 'next/link'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { useState, useEffect } from 'react'

const ALL_CATEGORIES_QUERY = gql`
	query ALL_CATEGORIES_QUERY {
		categories {
			id
			published
			slug_da
			slug_en
			name_da
			name_en
			sorting
			images {
				image
			}
		}
	}
`

const CREATE_CATEGORY_MUTATION = gql`
	mutation CREATE_CATEGORY_MUTATION {
		createCategory {
			id
		}
	}
`

const SORT_CATEGORIES_MUTATION = gql`
	mutation SORT_CATEGORIES_MUTATION($categories: [ID]) {
		sortCategories(categories: $categories) {
			message
		}
	}
`

const StyledList = styled.ul`
	list-style: none;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 30px;
`

const StyledTile = styled.li`
	overflow: auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

	h3 {
	}
	img {
		float: left;

		margin: ${props => props.theme.spacing.sm};
		width: 100px;
		min-width: 100px;
	}
	.bubble {
		float: right;
		width: 5px;
		background: green;
	}
`

const Tile = ({ data }) => (
	<StyledTile>
		<Link href={`/admin/category?id=${data.id}`}>
			<a>
				<img src={data.images[0] ? data.images[0].image : null} />
				<h3>{data.name_da || 'New category'}</h3>
				{!data.published && <Icon name="inactive" size="lg" />}
			</a>
		</Link>
	</StyledTile>
)

const SortableItem = SortableElement(props => <Tile {...props}>{props.children}</Tile>)

const SortableList = SortableContainer(({ children }) => {
	return <StyledList>{children}</StyledList>
})

const Button = styled.button`
	cursor: pointer;
`

const CategoriesOverview = () => {
	const { loading, error, data } = useQuery(ALL_CATEGORIES_QUERY)
	const [createCategory, { loading: loadingCreate, error: errorCreate }] = useMutation(CREATE_CATEGORY_MUTATION)
	const [sortCategories, { loading: loadingSort, error: errorSort }] = useMutation(SORT_CATEGORIES_MUTATION)

	const [categories, setCategories] = useState([])

	useEffect(() => {
		if (data && data.categories) setCategories(data.categories)
	}, [data])

	const initializeCategory = async e => {
		e.preventDefault()
		await createCategory()
			.catch(error => {
				console.log(error)
			})
			.then(response => {
				window.location = `/admin/category?id=${response.data.createCategory.id}`
			})
	}

	const onSortEnd = async ({ oldIndex, newIndex }) => {
		const reorderedCategories = arrayMove(categories, oldIndex, newIndex)
		setCategories(reorderedCategories)

		await sortCategories({
			variables: {
				categories: reorderedCategories.map(category => category.id),
			},
		})
			.catch(error => {
				console.log(error)
			})
			.then(response => {
				console.log(response.data.sortCategories.message)
			})
	}

	return (
		<SortableList axis="xy" distance={1} onSortEnd={onSortEnd}>
			{categories &&
				categories.map((category, index) => <SortableItem key={category.id} index={index} data={category} />)}
			<Button onClick={initializeCategory}>
				<Icon name="add" size="lg" />
			</Button>
		</SortableList>
	)
}

export { CategoriesOverview }
