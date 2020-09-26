import { Icon, SortableList, SortableItem } from '../../components'
import { useQuery, useMutation, gql } from '@apollo/client'
import styled from 'styled-components'
import Link from 'next/link'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { useState, useEffect } from 'react'

const PRODUCTS_QUERY = gql`
	query PRODUCTS_QUERY {
		products {
			id
			published
			code
			name_da
			sorting
		}
	}
`

/*
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
*/

const Button = styled.button`
	cursor: pointer;
`

const ProductsOverview = () => {
	const { loading, error, data } = useQuery(PRODUCTS_QUERY)
	// const [createCategory, { loading: loadingCreate, error: errorCreate }] = useMutation(CREATE_CATEGORY_MUTATION)
	// const [sortCategories, { loading: loadingSort, error: errorSort }] = useMutation(SORT_CATEGORIES_MUTATION)

	const [products, setProducts] = useState([])

	useEffect(() => {
		if (data && data.products) setProducts(data.products)
	}, [data])

	const initializeProduct = async e => {
		e.preventDefault()
		/*
        await createCategory()
			.catch(error => {
				console.log(error)
			})
			.then(response => {
				window.location = `/admin/category?id=${response.data.createCategory.id}`
            })
            */
	}

	/*
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
    */

	return (
		<>
			<SortableList axis="xy" distance={1} /*onSortEnd={onSortEnd}*/>
				{products &&
					products.map((product, index) => (
						<SortableItem key={product.id} index={index}>
							<a href={`/admin/product?id=${product.id}`}>
								<div>
									{/*<img src={data.images[0] ? data.images[0].image : null} />*/}
									<img alt="" src={'/images/placeholder_product.png'} />
								</div>

								<div>
									<div className="meta">
										<h3>{product.name_da || 'New product'}</h3>
									</div>
									<div className="meta">{product.code}</div>
									<div className="meta">{product.price}</div>
								</div>
							</a>
						</SortableItem>
					))}

				<Button onClick={initializeProduct}>
					<Icon name="add" size="lg" />
				</Button>
			</SortableList>
		</>
	)
}

export { ProductsOverview }
