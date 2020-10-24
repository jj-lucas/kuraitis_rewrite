import { gql, useMutation, useQuery } from '@apollo/client'
import arrayMove from 'array-move'
import { useEffect, useState } from 'react'
import { MdAdd, MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import styled from 'styled-components'
import { SortableItem, SortableList } from '../../components'

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
	background: var(--lightGray);
	padding: 0 0 2rem;
	position: relative;
	a {
		color: var(--black);
	}
	h3 {
		margin: 0;
	}
	img {
		width: 100%;
	}
	.meta {
		padding: 0 2rem;
	}
`

const StyledDotActiveIcon = styled(MdRadioButtonChecked)`
	position: absolute;
	top: 10px;
	right: 10px;
	color: var(--positive);
`

const StyledDotInactiveIcon = styled(MdRadioButtonUnchecked)`
	position: absolute;
	top: 10px;
	right: 10px;
	color: var(--negative);
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
								</div>
							</a>
							{category.published ? <StyledDotActiveIcon size={20} /> : <StyledDotInactiveIcon size={20} />}
						</StyledCard>
					</SortableItem>
				))}
			<Button onClick={initializeCategory}>
				<MdAdd size={50} />
			</Button>
		</SortableList>
	)
}

export { CategoriesOverview }
