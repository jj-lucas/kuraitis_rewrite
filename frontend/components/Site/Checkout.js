import { FiTruck as DeliveryIcon } from 'react-icons/fi'
import styled from 'styled-components'
import { CartProductsList, Form, Payment } from '../../components'
import { CartContext, CurrencyContext, LocaleContext, prettyPrice, translate } from '../../lib'

const StyledCheckout = styled.div`
	.main {
		display: flex;
	}
	.remove {
		display: none;
	}

	.details {
		flex-basis: 60%;
	}
	.items {
		flex-basis: 40%;

		ul {
			border-bottom: 1px solid black;
		}
	}
	${Form} {
		width: 90%;
	}
	.total {
		> div {
			display: grid;
			grid-template-columns: 1fr 1fr;

			&:first-of-type {
				border-bottom: 3px solid black;
			}
		}
		p,
		strong {
			vertical-align: top;
		}
	}
`

const Checkout = () => {
	const { locale } = React.useContext(LocaleContext)
	const { cart } = React.useContext(CartContext)
	const { currency, setCurrency } = React.useContext(CurrencyContext)

	let subtotal = 0
	if (cart && cart.items) {
		cart.items.map((sku, index) => {
			const skuData = cart.skus.find(candidate => candidate.sku == sku)
			subtotal += (skuData.price && skuData.price[currency]) || skuData.product.price[currency]
		})
	}

	if (!cart || !cart.items) {
		return (
			<>
				<h1>{translate('checkout', locale)}</h1>
				<p>Your shopping cart is empty</p>
			</>
		)
	}

	return (
		<StyledCheckout>
			<div>
				<h1>{translate('checkout', locale)}</h1>
			</div>
			<div className="main">
				<div className="details">
					<Form>
						<Payment
							cartId={cart.id}
							amount={subtotal}
							locale={locale}
							currency={currency}
							image={
								'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*'
							}>
							<button type="submit" onClick={e => e.preventDefault()}>
								{translate('checkout', locale)}
							</button>
						</Payment>
					</Form>
				</div>
				<div className="items">
					<h2>{translate('order_summary', locale)}</h2>
					<CartProductsList cart={cart} />
					<div className="total">
						<div>
							<p title={translate('choose_track_trace', locale)}>
								<DeliveryIcon size={23} style={{ marginRight: 10, marginLeft: 10 }} />
								<strong> Standard delivery</strong>
							</p>
							<p>Free</p>
						</div>
						<div>
							<h2>{translate('total', locale)}</h2>
							<h2>{prettyPrice(subtotal, currency)}</h2>
						</div>
					</div>
				</div>
			</div>
		</StyledCheckout>
	)
}

export { Checkout }
