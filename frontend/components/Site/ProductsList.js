import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { prettyPrice, LocaleContext } from '../../lib'
import { Picture } from '../../components'

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
			price
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
	padding: ${props => props.theme.spacing.sm};

	a {
		display: block;
		color: ${props => props.theme.colors.black};

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
		padding: 0 ${props => props.theme.spacing.base};
		font-weight: ${props => props.theme.typography.fw.semibold};
	}
`

const CategoryOfProducts = ({ products }) => {
	const { locale } = React.useContext(LocaleContext)
	return (
		<StyledList>
			{products &&
				products.map(product => (
					<StyledCard key={product.id}>
						<a
							href={`/${locale}/${locale == 'da' ? `produkt` : 'product'}/${product.code}/${
								product[`slug_${locale}`]
							}`}>
							<div>
								<Picture source={product.images[0] ? product.images[0].image : '/images/placeholder_product.png'} />
							</div>

							<div>
								<div className="meta">
									<h3>{product[`name_${locale}`]}</h3>
								</div>
								<div className="meta">{prettyPrice(product.price, 'DKK')}</div>
							</div>
						</a>
					</StyledCard>
				))}
		</StyledList>
	)
}

const ProductsList = ({ categorySlug }) => {
	const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
		variables: { categorySlug },
	})

	if (loading) return <p>Loading</p>

	const { locale } = React.useContext(LocaleContext)

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
