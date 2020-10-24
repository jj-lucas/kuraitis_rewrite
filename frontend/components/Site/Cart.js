import { useMutation } from '@apollo/client'
import { FiTruck as DeliveryIcon } from 'react-icons/fi'
import { ImGift as GiftIcon } from 'react-icons/im'
import { MdCached as ReturnIcon, MdClear, MdClose } from 'react-icons/md'
import styled from 'styled-components'
import {
	CartContext,
	CART_QUERY,
	CurrencyContext,
	LocaleContext,
	prettyPrice,
	translate,
	UPDATE_CART_MUTATION,
} from '../../lib'
import { Form } from '../Shared'

const StyledCart = styled.div`
	position: fixed;
	right: 0;
	-ms-transform: translateX(100%);
	transform: translateX(100%);
	width: 100%;
	height: 100vh;
	z-index: 10;
	overflow: auto;

	box-shadow: ${props => props.theme.boxShadow.lg};
	background: white;

	transition: transform
		${props => `${props.theme.transition.durations.short} ${props.theme.transition.types.easeInOut}`};

	${props =>
		props.open &&
		`
	-ms-transform: translateX(0%);
	transform: translateX(0%);
	`}

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		width: 500px;
	}

	.wrapper {
		padding: 2rem;
	}

	.close {
		cursor: pointer;
	}

	ul {
		padding: 0;
		margin-bottom: 0;
	}

	li {
		border-top: 1px solid var(--black);
		padding: 1rem 0;
		list-style: none;
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-gap: 2rem;

		&:last-of-type {
			border-bottom: 1px solid var(--black);
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
			margin-right: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;

			a {
				color: var(--gray);

				&:hover {
					color: var(--black);
				}
			}
		}
	}

	.selling_points {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;

		@media (max-width: ${props => props.theme.breakpoints.sm}) {
			font-size: ${props => props.theme.typography.fs.sm};
		}

		span {
			display: block;
		}

		p {
			color: var(--lightishGray);
			text-align: center;
		}
	}

	.subtotal {
		margin-top: 4rem;
		font-size: ${props => props.theme.typography.fs.lg};
		span {
			font-weight: ${props => props.theme.typography.fw.light};
		}
	}

	button[type='submit'] {
		width: 100%;
		padding: 2rem;
		text-transform: uppercase;
		cursor: pointer;
		transition: opacity
			${props => `${props.theme.transition.durations.short} ${props.theme.transition.types.easeInOut}`};

		&:hover {
			opacity: 0.8;
		}
	}

	img {
		width: 164px;
	}
`

const Cart = () => {
	const { cart, cartOpen, setCartOpen } = React.useContext(CartContext)
	const { currency } = React.useContext(CurrencyContext)
	const [updateCart, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_CART_MUTATION)
	const { locale } = React.useContext(LocaleContext)

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

	const close = e => {
		e.preventDefault()
		setCartOpen(false)
	}

	const checkout = e => {
		e.preventDefault()
	}

	let subtotal = 0
	if (cart && cart.items) {
		cart.items.map((sku, index) => {
			const skuData = cart.skus.find(candidate => candidate.sku == sku)
			subtotal += (skuData.price && skuData.price[currency]) || skuData.product.price[currency]
		})
	}

	return (
		<StyledCart open={cartOpen}>
			<div className="wrapper">
				<div className="close" onClick={close}>
					<MdClose size={30} />
				</div>
				<h2>{translate('your_cart', locale)}</h2>
				<ul>
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
				</ul>
				<div className="selling_points">
					<p>
						<span>
							<DeliveryIcon size={25} />
						</span>
						{translate('free_delivery', locale)}
					</p>
					<p>
						<span>
							<GiftIcon size={25} />
						</span>
						{translate('gift_wrapping', locale)}
					</p>
					<p title={translate('customized_returns', locale)}>
						<span>
							<ReturnIcon size={25} />
						</span>
						{translate('returns_30_days', locale)}
					</p>
				</div>
				<h3 className="subtotal">
					{translate('subtotal', locale)}: <span>{prettyPrice(subtotal, currency)}</span>
				</h3>
				{subtotal ? (
					<Form>
						<button type="submit" onClick={checkout}>
							{translate('checkout', locale)}
						</button>
					</Form>
				) : null}
			</div>
		</StyledCart>
	)
}

export { Cart }
