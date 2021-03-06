import { gql, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FiTruck as DeliveryIcon } from 'react-icons/fi'
import { ImGift as GiftIcon } from 'react-icons/im'
import { MdCached as ReturnIcon, MdPinDrop as TrackIcon } from 'react-icons/md'
import styled from 'styled-components'
import { CurrencyContext, LocaleContext, prettyPrice, translate } from '../../lib'
import { Form, SellingPoints } from '../../components'
const unescape = require('lodash.unescape')

const ORDER_QUERY = gql`
	query ORDER_QUERY($id: ID!) {
		order(id: $id) {
			id
			number
			createdAt
			items {
				code
				name
				price
				image
				variationInfo
				customization
			}
			shipping
			shippingCosts
			total
			currency
			customer {
				email
				name
				address
				address2
				city
				zip
				country
			}
			shippedAt
			trackingCode
			comment
		}
	}
`

const StyledOrder = styled.div`
	.main {
		display: flex;
	}

	${Form} {
		width: 90%;

		fieldset {
			padding-left: 1rem;
		}
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
			padding: 0;
			margin-bottom: 0;
		}

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
				margin-right: 1rem;
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
	}
	.shipping {
		> div {
			display: grid;
			grid-template-columns: 1fr 1fr;

			strong {
				display: inline-block;
				vertical-align: top;
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
				border-top: 3px solid black;
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

const Order = ({ orderId }) => {
	const { locale } = useContext(LocaleContext)
	const { currency, setCurrency } = useContext(CurrencyContext)

	const { loading, error, data } = useQuery(ORDER_QUERY, {
		variables: { id: orderId },
	})

	if (loading) {
		return <p>Loading</p>
	}

	if (!data || !data.order) {
		return (
			<>
				<h1>{translate('your_order', locale)}</h1>
				<p>
					We couldn't find this order. Please <a href="mailto:sergio@kuraitis.dk">contact Sergio</a> directly if in need
					of assistance.
				</p>
			</>
		)
	}

	const { order } = data

	return (
		<StyledOrder>
			<div>
				<h1>{translate('your_order', locale)}</h1>
			</div>
			<div className="main">
				<div className="details">
					<Form>
						<fielset>
							<h2>{translate('order_details', locale)}</h2>
							<p>
								<strong>
									{translate('order_number', locale)}
									{order.number}
								</strong>
							</p>
							<p>
								<strong>{translate('order_date', locale)}: </strong>
								{format(new Date(parseInt(order.createdAt, 10)), 'dd/MM/yyyy HH:mm')}
							</p>
						</fielset>
						<fielset>
							<h2>{translate('customer_details', locale)}</h2>
							<p>
								<strong>{unescape(order.customer.name)}</strong>
								<br />
								{unescape(order.customer.email)}
								<br />
								{unescape(order.customer.address)}
								{order.customer.address2 && `, ${unescape(order.customer.address2)}`}
								<br />
								{unescape(order.customer.zip)} {unescape(order.customer.city)}
								<br />
								{unescape(order.customer.country)}
							</p>
							{order.comment && (
								<p>
									<strong>{translate('comments', locale)}:</strong> {unescape(order.comment)}
								</p>
							)}
						</fielset>
						<fielset>
							<h2>{translate('shipment_status', locale)}</h2>
							{!order.shippedAt ? (
								<p>{translate('still_in_progress', locale)}</p>
							) : (
								<>
									{locale === 'en' ? (
										<>
											<p>Your order was shipped on the {format(new Date(parseInt(order.shippedAt, 10)), 'do LLLL')}.</p>
											{order.trackingCode && (
												<p>
													Follow your shipment progress using the following Track & Trace code:{' '}
													<a target="_blank" href={`https://tracking.postnord.com/dk/?id=${order.trackingCode}`}>
														{order.trackingCode}
													</a>
												</p>
											)}
										</>
									) : (
										<>
											<p>Your order was shipped on the {format(new Date(parseInt(order.shippedAt, 10)), 'do LLLL')}.</p>
											{order.trackingCode && (
												<p>
													Follow your shipment progress using the following Track & Trace code:{' '}
													<a target="_blank" href={`https://tracking.postnord.com/dk/?id=${order.trackingCode}`}>
														{order.trackingCode}
													</a>
												</p>
											)}
										</>
									)}
								</>
							)}
						</fielset>
						<fielset>
							<h2>{translate('additional_help', locale)}</h2>
							{locale === 'en' ? (
								<p>
									Check out the{' '}
									<Link href={`/${locale}/faq`}>
										<a>Frequently Asked Questions</a>
									</Link>{' '}
									page. You are welcome to <a href="mailto:sergio@kuraitis.dk">contact Sergio</a> directly for any
									question/comment regarding your order.
								</p>
							) : (
								<p>
									Tjek siden{' '}
									<Link href={`/${locale}/faq`}>
										<a>Ofte stillede spørgsmål</a>
									</Link>
									. Du er velkommen til at <a href="mailto:sergio@kuraitis.dk">kontakte Sergio</a> direkte for enhver
									spørgsmål / kommentar vedrørende din ordre.
								</p>
							)}
						</fielset>
					</Form>
				</div>
				<div className="items">
					<h2>{translate('order_summary', locale)}</h2>
					<ul>
						{order.items.map((item, index) => (
							<li key={item + index}>
								<div className="image">
									<img src={item.image} alt="" />
								</div>
								<div>
									<p className="sku">{item.code}</p>
									<p className="name">{item.name}</p>
									{Object.keys(JSON.parse(item.variationInfo)).map(attribute => {
										return (
											<p key={attribute}>
												<strong>{translate(attribute, locale, 'capitalize')}: </strong>
												{translate(JSON.parse(item.variationInfo)[attribute], locale, 'capitalize')}
											</p>
										)
									})}
									{item.customization && (
										<p>
											<strong>{translate('customization', locale, 'capitalize')}: </strong>
											{item.customization}
										</p>
									)}
									<p className="price">{prettyPrice(item.price, order.currency)}</p>
								</div>
							</li>
						))}
					</ul>
					<div className="shipping">
						{JSON.parse(order.shippingCosts).map(tariff => {
							return (
								<div key={tariff.code}>
									<p>
										{tariff.code.includes('track_trace') ? (
											<TrackIcon size={23} style={{ marginRight: 10, marginLeft: 10 }} />
										) : (
											<DeliveryIcon size={23} style={{ marginRight: 10, marginLeft: 10 }} />
										)}
										<strong> {translate(tariff.code, locale)}</strong>
									</p>
									<p>{prettyPrice(tariff.price, order.currency)}</p>
								</div>
							)
						})}
					</div>
					<div className="total">
						<div>
							<h2>
								{translate('total', locale)}
								<small> ({translate('vat_included', locale)})</small>
							</h2>
							<h2>{prettyPrice(order.total / 100, order.currency)}</h2>
						</div>
					</div>
				</div>
			</div>

			<SellingPoints />
		</StyledOrder>
	)
}

export { Order }
