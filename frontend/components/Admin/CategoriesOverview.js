import { Icon, SortableList, SortableItem } from '../../components'
import { useQuery, useMutation, gql } from '@apollo/client'
import styled from 'styled-components'
import Link from 'next/link'
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
			images(orderBy: sorting_ASC) {
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
		<SortableList axis="xy" distance={1} onSortEnd={onSortEnd} columns={4}>
			{categories &&
				categories.map((category, index) => (
					<SortableItem key={category.id} index={index}>
						<StyledCard>
							<a href={`/admin/category?id=${category.id}`}>
								<div>
									<img
										alt=""
										src={category.images[0] ? category.images[0].image : '/images/placeholder_category.png'}
									/>
								</div>

								<div>
									<div className="meta">
										<h3>{category.name_da || 'New category'}</h3>
									</div>
									<div className="meta">{!category.published && <Icon name="inactive" size="md" />}</div>
								</div>
							</a>
						</StyledCard>
					</SortableItem>
				))}
			<Button onClick={initializeCategory}>
				<Icon name="add" size="lg" />
			</Button>
		</SortableList>
	)
}

export { CategoriesOverview }
