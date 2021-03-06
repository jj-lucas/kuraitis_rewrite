import { default as countriesList } from 'country-list-js'
import React, { useContext, useRef, useState } from 'react'
import { FiTruck as DeliveryIcon } from 'react-icons/fi'
import { ImGift as GiftIcon } from 'react-icons/im'
import { MdCached as ReturnIcon, MdPinDrop as TrackIcon } from 'react-icons/md'
import styled from 'styled-components'
import { CartProductsList, Form, Payment, SellingPoints } from '../../components'
import { CartContext, CurrencyContext, LocaleContext, prettyPrice, translate } from '../../lib'

const StyledCheckout = styled.div`
	.main {
		display: flex;
		flex-wrap: wrap;
	}
	.remove {
		display: none;
	}

	.details {
		flex-basis: 100%;
		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			flex-basis: 60%;
		}
	}
	.items {
		flex-basis: 100%;
		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			flex-basis: 40%;
		}

		ul {
			border-bottom: 1px solid black;
		}

		img {
			margin-right: 1rem;
		}
	}
	${Form} {
		width: 90%;

		input,
		select,
		textarea {
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
		small {
			font-weight: ${props => props.theme.typography.fw.light};
			margin-left: 1rem;
		}
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
	const [comment, setComment] = useState('')

	const refForm = useRef(null)

	if (!cart || !cart.cartSkus || !shippingProfiles) {
		return (
			<>
				<h1>{translate('checkout', locale)}</h1>
				<p>{translate('no_items_in_cart', locale)}</p>
			</>
		)
	}

	let subtotal = 0
	if (cart && cart.cartSkus) {
		cart.cartSkus.map((cartSku, index) => {
			subtotal += (cartSku.sku.price && cartSku.sku.price[currency]) || cartSku.sku.product.price[currency]
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
							<h3>{translate('customer_information', locale)}</h3>
							<div>
								<input
									name="email"
									placeholder={translate('email', locale)}
									type="email"
									required
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</div>
						</fieldset>
						<fieldset>
							<h3>{translate('shipping_address', locale)}</h3>
							<div>
								<input
									name="name"
									placeholder={translate('name', locale)}
									type="text"
									required
									onChange={e => setName(e.target.value)}
									value={name}
								/>
							</div>
							<div>
								<input
									name="address"
									placeholder={translate('address', locale)}
									type="text"
									required
									onChange={e => setAddress(e.target.value)}
									value={address}
								/>
								<input
									name="address2"
									placeholder={translate('address2', locale)}
									type="text"
									onChange={e => setAddress2(e.target.value)}
									value={address2}
								/>
							</div>
							<div>
								<input
									name="city"
									placeholder={translate('city', locale)}
									type="text"
									required
									onChange={e => setCity(e.target.value)}
									value={city}
								/>
								<input
									name="zipcode"
									placeholder={translate('zip', locale)}
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
							<h3>{translate('shipping_method', locale)}</h3>
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
									? ' (Kan ikke spores, vælg Track and Trace for at overvåge forsendelsesfremskridt)'
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
						<fieldset>
							<h3>{translate('comments', locale)}</h3>
							<label htmlFor="comments">
								<textarea
									id="comments"
									onChange={e => {
										e.preventDefault()
										setComment(e.target.value)
									}}
									value={comment}></textarea>
							</label>
						</fieldset>
						{formValid ? (
							<Payment
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
								comment={comment}
								image={'/logo.png'}>
								<button type="submit">{translate('pay', locale)}</button>
							</Payment>
						) : (
							<button type="submit">{translate('pay', locale)}</button>
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
										<strong> {translate(shipping, locale)}</strong>
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
										<strong> {translate('standard_international', locale)}</strong>
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
							<h2>
								{translate('total', locale)}
								<small>{translate('vat_included', locale)}</small>
							</h2>
							<h2>{prettyPrice(subtotal, currency)}</h2>
						</div>
					</div>
				</div>
			</div>
			<SellingPoints />
		</StyledCheckout>
	)
}

export { Checkout }
