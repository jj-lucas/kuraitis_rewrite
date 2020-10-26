import { gql, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FiTruck as DeliveryIcon } from 'react-icons/fi'
import { ImGift as GiftIcon } from 'react-icons/im'
import { MdCached as ReturnIcon, MdPinDrop as TrackIcon } from 'react-icons/md'
import styled from 'styled-components'
import { CurrencyContext, LocaleContext, prettyPrice, translate } from '../../lib'
import { Form } from '../Shared'

const ORDER_QUERY = gql`
	query ORDER_QUERY($id: ID!) {
		order(where: { id: $id }) {
			id
			createdAt
			items {
				code
				name
				price
				image
				variationInfo
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

const Order = ({ orderId }) => {
	const { locale } = useContext(LocaleContext)
	const { currency, setCurrency } = useContext(CurrencyContext)

	const { loading, error, data } = useQuery(ORDER_QUERY, {
		variables: { id: orderId },
	})

	if (loading) {
		return <p>Loading</p>
	}

	if (!data) {
		return (
			<>
				<h1>{translate('checkout', locale)}</h1>
				<p>Your shopping cart is empty</p>
			</>
		)
	}

	const { order } = data
	console.log(order)

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
								<strong>{translate('order_date', locale)}: </strong>
								{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
							</p>
							<p>
								<strong>{translate('order_id', locale)}: </strong>
								{orderId}
							</p>
						</fielset>
						<fielset>
							<h2>{translate('customer_details', locale)}</h2>
							<p>
								<strong>{order.customer.name}</strong>
							</p>
							<p>{order.customer.email}</p>
							<p>
								{order.customer.address}
								{order.customer.address2 && `, ${order.customer.address2}`}
							</p>
							<p>
								{order.customer.city} {order.customer.zip}
							</p>
							<p>{order.customer.country}</p>
						</fielset>
						<fielset>
							<h2>{translate('shipment_status', locale)}</h2>
							{!order.shippedAt ? (
								<p>{translate('still_in_progress', locale)}</p>
							) : (
								<>
									{locale === 'en' ? (
										<>
											<p>Your order was shipped on the {format(new Date(order.shippedAt), 'do LLLL')}.</p>
											{order.trackingCode && (
												<p>
													Follow your shipment progress using the following Track & Trace code:{' '}
													<a
														target="_blank"
														href={`https://www.postnord.se/en/online-tools/tools/track/track-and-trace#dynamicloading=true&shipmentid=${order.trackingCode}`}>
														{order.trackingCode}
													</a>
												</p>
											)}
										</>
									) : (
										<>
											<p>Your order was shipped on the {format(new Date(order.shippedAt), 'do LLLL')}.</p>
											{order.trackingCode && (
												<p>
													Follow your shipment progress using the following Track & Trace code:{' '}
													<a
														target="_blank"
														href={`https://www.postnord.se/en/online-tools/tools/track/track-and-trace#dynamicloading=true&shipmentid=${order.trackingCode}`}>
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
									Check out the{' '}
									<Link href={`/${locale}/faq`}>
										<a>Frequently Asked Questions</a>
									</Link>{' '}
									page. You are welcome to <a href="mailto:sergio@kuraitis.dk">contact Sergio</a> directly for any
									question/comment regarding your order.
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
								<div class="image">
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
									<p className="price">{prettyPrice(item.price, order.currency)}</p>
								</div>
							</li>
						))}
					</ul>
					<div className="total">
						<div>
							{order.shippingCosts.map(tariff => {
								return (
									<>
										<p>
											{tariff.name.includes('track_trace') ? (
												<TrackIcon size={23} style={{ marginRight: 10, marginLeft: 10 }} />
											) : (
												<DeliveryIcon size={23} style={{ marginRight: 10, marginLeft: 10 }} />
											)}
											<strong> {translate(tariff.name, locale)}</strong>
										</p>
										<p>{prettyPrice(tariff.price, order.currency)}</p>
									</>
								)
							})}
						</div>
						<div>
							<h2>{translate('total', locale)}</h2>
							<h2>{prettyPrice(order.total / 100, order.currency)}</h2>
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
		</StyledOrder>
	)
}

export { Order }
