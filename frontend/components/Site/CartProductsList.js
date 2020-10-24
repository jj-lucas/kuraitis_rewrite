import { useMutation } from '@apollo/client'
import { MdClear } from 'react-icons/md'
import styled from 'styled-components'
import { CART_QUERY, CurrencyContext, LocaleContext, prettyPrice, translate, UPDATE_CART_MUTATION } from '../../lib'

const StyledCartProductsList = styled.ul`
	padding: 0;
	margin-bottom: 0;

	li {
		position: relative;
		border-top: 1px solid #dbdbdb;
		padding: 1rem 0;
		list-style: none;
		display: grid;
		grid-template-columns: 1fr 1fr;

		&:last-of-type {
			border-bottom: 1px solid #dbdbdb;
		}

		p {
			margin: 0.5rem 0 0;
		}
		.image {
			text-align: center;
		}
		.sku {
			font-size: ${props => props.theme.typography.fs.sm};
			font-weight: ${props => props.theme.typography.fw.bold};
		}

		.price {
			font-size: ${props => props.theme.typography.fs.lg};
			font-weight: ${props => props.theme.typography.fw.bold};
		}

		.remove {
			position: absolute;
			top: 2rem;
			right: 2rem;

			a {
				color: var(--gray);

				&:hover {
					color: var(--black);
				}
			}
		}

		img {
			width: 164px;
		}
	}
`

const CartProductsList = ({ cart }) => {
	const { locale } = React.useContext(LocaleContext)
	const { currency, setCurrency } = React.useContext(CurrencyContext)
	const [updateCart, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_CART_MUTATION)

	console.log(cart)

	const removeFromCart = async index => {
		await updateCart({
			variables: {
				id: cart.id,
				items: cart.items.slice(0, index).concat(cart.items.slice(index + 1, cart.items.length)),
			},
			refetchQueries: [{ query: CART_QUERY, variables: {} }],
		}).then(() => {
			// window.location = '/admin/products'
		})
	}

	return (
		<StyledCartProductsList>
			{cart &&
				cart.items &&
				cart.items.map((sku, index) => {
					const skuData = cart.skus.find(candidate => candidate.sku == sku)
					const image = skuData.image ? skuData.image.image : skuData.product.images[0].image
					const price = skuData.price || skuData.product.price

					const selectedAttributes = JSON.parse(skuData.product.selectedAttributes)
					const attributesInSku = Object.keys(selectedAttributes).filter(
						attribute => selectedAttributes[attribute].length
					)
					return (
						<li key={index}>
							<div class="image">
								<img src={image} alt="" />
							</div>
							<div>
								<p className="sku">{sku}</p>
								<p className="name">{skuData.product[`name_${locale}`]}</p>
								{attributesInSku.map((attribute, index) => {
									return (
										<p key={attribute + index}>
											<strong>{translate(attribute, locale, 'capitalize')}: </strong>
											{translate(sku.split('-')[index + 1], locale, 'capitalize')}
										</p>
									)
								})}
								<p className="price">{prettyPrice(price[currency], currency)}</p>
							</div>
							<div className="remove">
								<a
									href="#"
									onClick={e => {
										e.preventDefault()
										removeFromCart(index)
									}}>
									<MdClear size={20} />
								</a>
							</div>
						</li>
					)
				})}
		</StyledCartProductsList>
	)
}

export { CartProductsList }
