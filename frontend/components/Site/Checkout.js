import { default as countriesList } from 'country-list-js'
import React, { useContext, useRef, useState } from 'react'
import { FiTruck as DeliveryIcon } from 'react-icons/fi'
import { ImGift as GiftIcon } from 'react-icons/im'
import { MdCached as ReturnIcon, MdPinDrop as TrackIcon } from 'react-icons/md'
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

		input,
		select {
			margin-bottom: 1rem;
			background: transparent;
			border: 0 none;
			border-bottom: 1px solid #dbdbdb;
			font-family: ${props => props.theme.typography.ff.droid};
			font-weight: ${props => props.theme.typography.fw.regular};

			&::placeholder {
				color: var(--gray);
				opacity: 0.6;
			}
		}

		label {
			display: inline;
			font-family: ${props => props.theme.typography.ff.droid};
			font-weight: ${props => props.theme.typography.fw.regular};
		}

		input[type='radio'] {
			width: auto;
			margin-right: 1rem;
		}

		div {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 2rem;
		}

		button {
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
	}
	.total {
		> div {
			display: grid;
			grid-template-columns: 1fr 1fr;
			padding-bottom: 1rem;

			&:first-of-type {
				border-bottom: 3px solid black;
			}
		}
		p,
		strong {
			vertical-align: top;
			margin-bottom: 0;
		}
	}
	.selling-points {
		margin: 6rem 0 3rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 2rem;
		text-align: center;
	}
`

const Checkout = () => {
	const { locale } = useContext(LocaleContext)
	const { cart, shippingProfiles } = useContext(CartContext)
	const { currency, setCurrency } = useContext(CurrencyContext)
	const [formValid, setFormValid] = useState(false)
	const [shippingSuffix, setShippingSuffix] = useState('_denmark')

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [address2, setAddress2] = useState('')
	const [city, setCity] = useState('')
	const [zip, setZip] = useState('')
	const [country, setCountry] = useState('Denmark')
	const [shipping, setShipping] = useState('standard_denmark')

	const refForm = useRef(null)

	if (!cart || !cart.items || !shippingProfiles) {
		return (
			<>
				<h1>{translate('checkout', locale)}</h1>
				<p>Your shopping cart is empty</p>
			</>
		)
	}

	let subtotal = 0
	if (cart && cart.items) {
		cart.items.map((sku, index) => {
			const skuData = cart.skus.find(candidate => candidate.sku == sku)
			subtotal += (skuData.price && skuData.price[currency]) || skuData.product.price[currency]
		})
	}

	// add shipping costs
	if (shipping === 'standard_denmark' || shipping === 'standard_international') {
		subtotal += shippingProfiles.find(profile => profile.code === `standard${shippingSuffix}`).price[currency] / 100
	} else {
		// must be Track & Trace
		subtotal += shippingProfiles.find(profile => profile.code === `standard${shippingSuffix}`).price[currency] / 100
		subtotal += shippingProfiles.find(profile => profile.code === `track_trace${shippingSuffix}`).price[currency] / 100
	}

	const onShippingChange = e => {
		setShipping(e.target.value)
	}

	return (
		<StyledCheckout>
			<div>
				<h1>{translate('checkout', locale)}</h1>
			</div>
			<div className="main">
				<div className="details">
					<Form
						ref={refForm}
						onChange={() => {
							setFormValid(refForm.current.checkValidity())
						}}
						onSubmit={e => {
							e.preventDefault()
						}}>
						<fieldset>
							<h3>Customer information</h3>
							<div>
								<input
									name="email"
									placeholder="Email Address"
									type="email"
									required
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</div>
						</fieldset>
						<fieldset>
							<h3>Shipping address</h3>
							<div>
								<input
									name="name"
									placeholder="Recipient Name"
									type="text"
									required
									onChange={e => setName(e.target.value)}
									value={name}
								/>
							</div>
							<div>
								<input
									name="address"
									placeholder="Address"
									type="text"
									required
									onChange={e => setAddress(e.target.value)}
									value={address}
								/>
								<input
									name="address2"
									placeholder="Apt, suite, etc."
									type="text"
									onChange={e => setAddress2(e.target.value)}
									value={address2}
								/>
							</div>
							<div>
								<input
									name="city"
									placeholder="City"
									type="text"
									required
									onChange={e => setCity(e.target.value)}
									value={city}
								/>
								<input
									name="zipcode"
									placeholder="ZIP"
									type="text"
									required
									onChange={e => setZip(e.target.value)}
									value={zip}
								/>
							</div>
							<div>
								<select
									required
									onChange={e => {
										setShippingSuffix(e.target.value === 'Denmark' ? '_denmark' : '_international')
										setCountry(e.target.value)
										setShipping(e.target.value === 'Denmark' ? 'standard_denmark' : 'standard_international')
									}}
									value={country}>
									{countriesList.names().map(name => (
										<option key={name}>{name}</option>
									))}
								</select>
							</div>
						</fieldset>
						<fieldset>
							<h3>Shipping method</h3>
							<label htmlFor="shipping_standard">
								<input
									id="shipping_standard"
									type="radio"
									name="shipping"
									value={`standard${shippingSuffix}`}
									checked={shipping === `standard${shippingSuffix}`}
									onChange={onShippingChange}
								/>
								<strong>Standard </strong>
								{prettyPrice(
									shippingProfiles.find(profile => profile.code === `standard${shippingSuffix}`).price[currency] / 100,
									currency
								)}
								{shipping == 'standard_denmark'
									? ' (Not trackable, choose Track and Trace to monitor shipment progress)'
									: ' (Not trackable, choose Track and Trace to monitor shipment progress)'}
							</label>
							<br />
							<label htmlFor="shipping_track_trace">
								<input
									type="radio"
									id="shipping_track_trace"
									name="shipping"
									value={`track_trace${shippingSuffix}`}
									checked={shipping === `track_trace${shippingSuffix}`}
									onChange={onShippingChange}
								/>
								<strong>Track & Trace </strong>+
								{prettyPrice(
									shippingProfiles.find(profile => profile.code === `track_trace${shippingSuffix}`).price[currency] /
										100,
									currency
								)}
							</label>
						</fieldset>
						{formValid ? (
							<Payment
								cartId={cart.id}
								amount={subtotal}
								locale={locale}
								currency={currency}
								shipping={{
									email,
									name,
									address,
									address2,
									city,
									zip,
									country,
									shipping,
								}}
								image={'/logo.png'}>
								<button type="submit">{translate('checkout', locale)}</button>
							</Payment>
						) : (
							<button type="submit">{translate('checkout', locale)}</button>
						)}
					</Form>
				</div>
				<div className="items">
					<h2>{translate('order_summary', locale)}</h2>
					<CartProductsList cart={cart} />
					<div className="total">
						<div>
							{shipping === 'standard_denmark' || shipping === 'standard_international' ? (
								<>
									<p title={translate('choose_track_trace', locale)}>
										<DeliveryIcon size={23} style={{ marginRight: 10, marginLeft: 10 }} />
										<strong> Standard delivery</strong>
									</p>
									<p>
										{prettyPrice(
											shippingProfiles.find(profile => profile.code === `standard${shippingSuffix}`).price[currency] /
												100,
											currency
										)}
									</p>
								</>
							) : (
								<>
									<p>
										<DeliveryIcon size={23} style={{ marginRight: 10, marginLeft: 10 }} />
										<strong> Standard delivery</strong>
									</p>
									<p>
										{prettyPrice(
											shippingProfiles.find(profile => profile.code === `standard${shippingSuffix}`).price[currency] /
												100,
											currency
										)}
									</p>
									<p>
										<TrackIcon size={23} style={{ marginRight: 10, marginLeft: 10 }} />
										<strong> Track & Trace</strong>
									</p>
									<p>
										{prettyPrice(
											shippingProfiles.find(profile => profile.code === `track_trace${shippingSuffix}`).price[
												currency
											] / 100,
											currency
										)}
									</p>
								</>
							)}
						</div>
						<div>
							<h2>{translate('total', locale)}</h2>
							<h2>{prettyPrice(subtotal, currency)}</h2>
						</div>
					</div>
				</div>
			</div>
			<div class="selling-points">
				<div>
					<div>
						<DeliveryIcon size={25} />
					</div>
					<p>
						3-5 days until your order is made and shipped. <br />
						Actual delivery time is not included. See the FAQ for more info.
					</p>
				</div>
				<div>
					<div>
						<GiftIcon size={25} />
					</div>
					<p>All items are shipped in gift packaging.</p>
				</div>
				<div>
					<div>
						<ReturnIcon size={25} />
					</div>
					<p>
						Free cancellations prior to shipping. <br />
						30 days return right for non-customized products.
					</p>
				</div>
			</div>
		</StyledCheckout>
	)
}

export { Checkout }
