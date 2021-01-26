import { useMutation } from '@apollo/client'
import { MdClear } from 'react-icons/md'
import React from 'react'
import styled from 'styled-components'
import {
	CART_QUERY,
	CurrencyContext,
	LocaleContext,
	prettyPrice,
	translate,
	REMOVE_FROM_CART_MUTATION,
} from '../../lib'

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
	const [removeFromCart, { loading: loadingUpdate, error: errorUpdate }] = useMutation(REMOVE_FROM_CART_MUTATION)

	const removeItem = async id => {
		await removeFromCart({
			variables: {
				id,
			},
			refetchQueries: [{ query: CART_QUERY, variables: {} }],
		}).then(() => {
			// window.location = '/admin/products'
		})
	}

	return (
		<StyledCartProductsList>
			{cart && !cart.cartSkus.length && <p>{translate('no_items_in_cart', locale)}</p>}
			{cart &&
				cart.cartSkus &&
				cart.cartSkus.map((cartSku, index) => {
					const sku = cartSku.sku
					const image = sku.image ? sku.image.url : sku.product.images[0].url
					const price = sku.price || sku.product.price

					const selectedAttributes = JSON.parse(sku.product.selectedAttributes)
					const attributesInSku = Object.keys(selectedAttributes).filter(
						attribute => selectedAttributes[attribute].length
					)

					return (
						<li key={index}>
							<div className="image">
								<img src={image} alt="" />
							</div>
							<div>
								<p className="sku">{sku.sku}</p>
								<p className="name">{sku.product[`name_${locale}`]}</p>
								{attributesInSku.map((attribute, index) => {
									return (
										<p key={attribute + index}>
											<strong>{translate(attribute, locale, 'capitalize')}: </strong>
											{translate(sku.sku.split('-')[index + 1], locale, 'capitalize')}
										</p>
									)
								})}
								{cartSku.customization && (
									<p>
										<strong>{translate('customization', locale, 'capitalize')}: </strong>
										{cartSku.customization}
									</p>
								)}
								<p className="price">{prettyPrice(price[currency], currency)}</p>
							</div>
							<div className="remove">
								<a
									href="#"
									onClick={e => {
										e.preventDefault()
										removeItem(cartSku.id)
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
