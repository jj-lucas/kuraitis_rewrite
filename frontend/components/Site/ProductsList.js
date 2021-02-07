import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { Picture } from '../../components'
import { CurrencyContext, fromPrice, LocaleContext, prettyPrice } from '../../lib'
import React from 'react'

const PRODUCTS_QUERY = gql`
	query PRODUCTS_QUERY($categorySlug: String) {
		products(categorySlug: $categorySlug) {
			id
			published
			code
			name_da
			name_en
			slug_da
			slug_en
			price {
				DKK
				USD
				EUR
				GBP
			}
			hasMultiplePrices
			categories {
				id
			}
			images {
				id
				thumbUrl
			}
		}
		categories {
			id
			slug_da
			slug_en
			name_da
			name_en
			products {
				id
			}
		}
	}
`
const StyledList = styled.ul`
	list-style: none;
	display: grid;
	padding: 0;
	grid-template-columns: 1fr 1fr;
	grid-gap: 0px;
	font-family: ${props => props.theme.typography.ff.droid};

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		grid-template-columns: ${props => '1fr '.repeat(4)};
	}
`

const StyledCard = styled.li`
	padding: 1rem;

	a {
		display: block;
		color: var(--black);

		img {
			transition: all ${props => `${props.theme.transition.durations.short} ${props.theme.transition.types.easeInOut}`};
		}
		&:hover img {
			box-shadow: ${props => props.theme.boxShadow.md};
		}
	}

	h3 {
		margin: 0;
		font-size: ${props => props.theme.typography.fs.base};
		font-weight: ${props => props.theme.typography.fw.regular};
	}
	img {
		width: 100%;
	}
	.meta {
		padding: 0 2rem;
		font-weight: ${props => props.theme.typography.fw.semibold};
	}
`

const CategoryOfProducts = ({ products }) => {
	const { locale } = React.useContext(LocaleContext)
	const { currency } = React.useContext(CurrencyContext)
	return (
		<StyledList>
			{products &&
				products.map(
					product =>
						product.published && (
							<StyledCard key={product.id}>
								<a
									href={`/${locale}/${locale == 'da' ? `produkt` : 'product'}/${product.code}/${
										product[`slug_${locale}`]
									}`}>
									<div>
										<Picture
											source={product.images[0] ? product.images[0].thumbUrl : '/images/placeholder_product.png'}
										/>
									</div>

									<div>
										<div className="meta">
											<h3>{product[`name_${locale}`]}</h3>
										</div>
										<div className="meta">
											{fromPrice(product.hasMultiplePrices, locale)}
											{prettyPrice(product.price && product.price[currency], currency)}
										</div>
									</div>
								</a>
							</StyledCard>
						)
				)}
		</StyledList>
	)
}

const ProductsList = ({ categorySlug }) => {
	const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
		variables: { categorySlug },
	})
	const { locale } = React.useContext(LocaleContext)

	if (loading) return <p>Loading</p>

	const products = data.products
	const categories = data.categories

	return (
		<>
			{categories.map(category => {
				if (
					category.products.length &&
					(!categorySlug || category.slug_da == categorySlug || category.slug_en == categorySlug)
				) {
					let productsForCategory = products.filter(function (p) {
						return category.products.map(c => c.id).includes(p.id)
					})
					return (
						<div key={category.id}>
							<h2>{category[`name_${locale}`]}</h2>
							<CategoryOfProducts products={productsForCategory} category={category.id} />
						</div>
					)
				}
			})}
		</>
	)
}

export { ProductsList }
