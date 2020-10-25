import { FiTruck as DeliveryIcon } from 'react-icons/fi'
import { ImGift as GiftIcon } from 'react-icons/im'
import { MdCached as ReturnIcon, MdClose } from 'react-icons/md'
import styled from 'styled-components'
import { CartProductsList } from '../../components'
import { CartContext, CurrencyContext, LocaleContext, prettyPrice, translate } from '../../lib'
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
`

const Cart = () => {
	const { cart, cartOpen, setCartOpen } = React.useContext(CartContext)
	const { currency } = React.useContext(CurrencyContext)
	const { locale } = React.useContext(LocaleContext)

	const close = e => {
		e.preventDefault()
		setCartOpen(false)
	}

	const checkout = e => {
		e.preventDefault()
		window.location = `/${locale}/checkout`
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

				{cart && cart.items ? <CartProductsList cart={cart} /> : <p>{translate('no_items_in_cart', locale)}</p>}

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
				{subtotal ? (
					<>
						<h3 className="subtotal">
							{translate('subtotal', locale)}: <span>{prettyPrice(subtotal, currency)}</span>
						</h3>
						<Form>
							<button type="submit" onClick={checkout}>
								{translate('checkout', locale)}
							</button>
						</Form>{' '}
					</>
				) : null}
			</div>
		</StyledCart>
	)
}

export { Cart }
