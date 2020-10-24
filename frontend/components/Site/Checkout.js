import { FiTruck as DeliveryIcon } from 'react-icons/fi'
import styled from 'styled-components'
import { CartProductsList } from '../../components'
import { CartContext, CurrencyContext, LocaleContext, prettyPrice } from '../../lib'

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

	console.log(cart)
	let subtotal = 0
	if (cart && cart.items) {
		cart.items.map((sku, index) => {
			const skuData = cart.skus.find(candidate => candidate.sku == sku)
			subtotal += (skuData.price && skuData.price[currency]) || skuData.product.price[currency]
		})
	}

	return (
		<StyledCheckout>
			<div>
				<h1>Checkout</h1>
			</div>
			<div className="main">
				<div className="details">
					<p>test</p>
				</div>
				<div className="items">
					<h2>Order summary</h2>
					<CartProductsList cart={cart} />
					<div className="total">
						<div>
							<p title="Choose Track & Trace if you want to be able to track your package">
								<DeliveryIcon size={23} style={{ marginRight: 10, marginLeft: 10 }} />
								<strong> Standard delivery</strong>
							</p>
							<p>Free</p>
						</div>
						<div>
							<h2>Total</h2>
							<h2>{prettyPrice(subtotal, currency)}</h2>
						</div>
					</div>
				</div>
			</div>
		</StyledCheckout>
	)
}

export { Checkout }
