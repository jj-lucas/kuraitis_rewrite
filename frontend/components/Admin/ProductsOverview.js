import { gql, useMutation, useQuery } from '@apollo/client'
import { DiffAddedIcon, DotFillIcon, DotIcon } from '@primer/octicons-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SortableItem, SortableList } from '../../components'

const PRODUCTS_QUERY = gql`
	query PRODUCTS_QUERY {
		products {
			id
			published
			code
			name_da
			categories {
				id
			}
			images(orderBy: sorting_ASC) {
				id
				image
			}
		}
		categories {
			id
			name_da
			products {
				id
			}
		}
	}
`

const CREATE_PRODUCT_MUTATION = gql`
	mutation CREATE_PRODUCT_MUTATION($category: ID) {
		createProduct(category: $category) {
			id
		}
	}
`

const Button = styled.button`
	cursor: pointer;
`
const StyledCard = styled.div`
	background: var(--lightGray);
	padding: 0 0 ${props => props.theme.spacing.base};
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
		padding: 0 ${props => props.theme.spacing.base};
	}
`
const StyledDotActiveIcon = styled(DotFillIcon)`
	position: absolute;
	top: 10px;
	right: 10px;
	color: var(--positive);
`

const StyledDotInactiveIcon = styled(DotIcon)`
	position: absolute;
	top: 10px;
	right: 10px;
	color: var(--negative);
`

const ProductsOverview = () => {
	const { loading, error, data } = useQuery(PRODUCTS_QUERY)

	if (loading) return <p>Loading</p>

	const products = data.products
	const categories = data.categories

	const uncategorizedProducts = products.filter(function (product) {
		return !product.categories.length
	})

	return (
		<>
			{categories.map(category => {
				if (category.products.length) {
					let productsForCategory = products.filter(function (p) {
						return category.products.map(c => c.id).includes(p.id)
					})
					return (
						<div key={category.id}>
							<h2>{category.name_da}</h2>
							<CategoryOfProducts products={productsForCategory} category={category.id} />
						</div>
					)
				}
			})}
			{uncategorizedProducts && (
				<>
					<h2>Uncategorized</h2>
					<CategoryOfProducts products={uncategorizedProducts} />
				</>
			)}
		</>
	)
}

const CategoryOfProducts = props => {
	const [products, setProducts] = useState([])

	const [createProduct, { loading: loadingCreate, error: errorCreate }] = useMutation(CREATE_PRODUCT_MUTATION)

	useEffect(() => {
		if (props.products) setProducts(props.products)
	}, [props.products])

	const initializeProduct = async (e, categoryId) => {
		e.preventDefault()

		await createProduct({
			variables: {
				category: props.category ? props.category : null,
			},
		})
			.catch(error => {
				console.log(error)
			})
			.then(response => {
				window.location = `/admin/product?id=${response.data.createProduct.id}`
			})
	}

	return (
		<SortableList axis="xy" distance={1}>
			{products &&
				products.map((product, index) => (
					<SortableItem key={product.id} index={index}>
						<StyledCard>
							<a href={`/admin/product?id=${product.id}`}>
								<div>
									<img src={product.images[0] ? product.images[0].image : '/images/placeholder_product.png'} />
								</div>

								<div>
									<div className="meta">
										<h3>{product.name_da || 'New product'}</h3>
									</div>
									<div className="meta">{product.code}</div>
									<div className="meta">{product.price}</div>
								</div>
								{product.published ? <StyledDotActiveIcon size="medium" /> : <StyledDotInactiveIcon size="medium" />}
							</a>
						</StyledCard>
					</SortableItem>
				))}

			<Button onClick={e => initializeProduct(e, props.category)}>
				<DiffAddedIcon size="medium" />
			</Button>
		</SortableList>
	)
}

export { ProductsOverview }
