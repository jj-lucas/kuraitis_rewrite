import { gql, useMutation, useQuery } from '@apollo/client'
import { add, format } from 'date-fns'
import { useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import styled from 'styled-components'
import { stripePaymentsUrl } from '../../config'

const ORDERS_QUERY = gql`
	query ORDERS_QUERY {
		orders {
			id
			number
			charge
			createdAt
			shippedAt
			currency
			total
			locale
			trackingCode
			items {
				code
				price
				image
			}
			customer {
				email
				name
				address
				address2
				city
				zip
				country
			}
			shipping
		}
	}
`

const MARK_ORDER_AS_SHIPPED_MUTATION = gql`
	mutation MARK_ORDER_AS_SHIPPED_MUTATION($id: String!, $trackingCode: String) {
		markOrderAsShipped(id: $id, trackingCode: $trackingCode) {
			message
		}
	}
`

const SEND_ORDER_CONFIRMATION_MUTATION = gql`
	mutation SEND_ORDER_CONFIRMATION_MUTATION($orderId: String!) {
		sendConfirmationMail(orderId: $orderId) {
			message
		}
	}
`

const SEND_ORDER_SHIPPED_MAIL_MUTATION = gql`
	mutation SEND_ORDER_SHIPPED_MAIL_MUTATION($orderId: String!) {
		sendOrderShippedMail(orderId: $orderId) {
			message
		}
	}
`

const StyledOrder = styled.li`
	list-style: none;
	box-shadow: ${props => props.theme.boxShadow.md};
	padding: 2rem;
	margin-bottom: 2rem;
	border-left: 2rem solid #f5f3e3;

	&.shipped {
		border-left: 2rem solid #f1f1f1;
	}

	.info {
		display: grid;
		grid-template-columns: 2fr 2fr 1fr;
		grid-gap: 2rem;
	}

	.orderId {
		font-size: ${props => props.theme.typography.fs.sm};
	}

	ul {
		padding-left: 0;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1rem;
	}

	.item {
		display: flex;
		align-items: center;
		text-align: center;
		box-shadow: ${props => props.theme.boxShadow.sm};

		a {
			color: black;
		}

		img {
			width: 100%;
			margin-right: 1rem;
		}
	}

	.address {
		display: inline-block;
		padding: 1rem;
		background-color: #f5f3e3;

		&.track_trace {
			background-image: linear-gradient(
				45deg,
				#f5f3e3 25%,
				#facbbb 25%,
				#facbbb 50%,
				#f5f3e3 50%,
				#f5f3e3 75%,
				#facbbb 75%,
				#facbbb 100%
			);
			background-size: 56.57px 56.57px;
		}
	}
`

const Order = ({ order, triggerConfirmationMail, triggerMarkAsShipped, triggerOrderShippedMail }) => {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<StyledOrder className={order.shippedAt && 'shipped'} key={order.id}>
			<div className="header">Order #: {order.number}</div>
			<div className="info">
				<div>
					<p>
						<strong>{order.customer.name}</strong> <br />
						<a href={`mailto:${order.customer.email}`}>{order.customer.email}</a> <br />
						<span className="orderId"></span>
					</p>
					<h2>
						{order.total / 100} {order.currency}
					</h2>
				</div>
				<div>
					<p>
						Purchased: {format(new Date(parseInt(order.createdAt, 10)), 'dd MMMM, yyyy')} <br />
						{!order.shippedAt && (
							<>
								Estimated shipping:{' '}
								<strong>{format(add(new Date(parseInt(order.createdAt, 10)), { days: 4 }), 'dd MMMM, yyyy')}</strong>
							</>
						)}
					</p>
				</div>
				<div>
					<p>
						{order.shippedAt ? (
							<>
								<p>Shipped: {format(new Date(parseInt(order.shippedAt, 10)), 'dd MMMM, yyyy')}</p>
								{order.trackingCode && <p>Tracking code: {order.trackingCode}</p>}
							</>
						) : (
							<button onClick={e => triggerMarkAsShipped(order.id, order.shipping)}>Mark as shipped</button>
						)}
					</p>

					{showAdvanced ? (
						<>
							<p onClick={e => setShowAdvanced(!showAdvanced)}>
								Hide advanced options
								<MdExpandLess />
							</p>
							<p>
								<a target="_blank" href={`/${order.locale}/order/${order.id}`}>
									Open order details
								</a>
								<br />
								<a target="_blank" href={`${stripePaymentsUrl}${order.charge}`}>
									Open payment in Stripe
								</a>
								<br />
								{order.trackingCode && (
									<>
										<a target="_blank" href={`https://tracking.postnord.com/dk/?id=${order.trackingCode}`}>
											Open Track & Trace
										</a>
										<br />
									</>
								)}
								<span>--</span>
								<br />
								<a target="_blank" href={`#`} onClick={e => triggerConfirmationMail(order.id)}>
									Resend confirmation email
								</a>
								<br />
								<a target="_blank" href={`#`} onClick={e => triggerOrderShippedMail(order.id)}>
									Resend shipping email
								</a>
							</p>
						</>
					) : (
						<p onClick={e => setShowAdvanced(!showAdvanced)}>
							Show advanced options
							<MdExpandMore />
						</p>
					)}
				</div>
			</div>
			<div className="info">
				<div>
					<h3>Productos</h3>
					<ul>
						{order.items.map((item, index) => (
							<li className="item" key={item + index}>
								<a target={'blank'} href={`/da/product/${item.code.split('-')[0]}/${item.code}`}>
									<div>
										<img src={item.image} />
									</div>
									<strong>{item.code}</strong>
								</a>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3>Spedizione</h3>
					<p>
						Metodo: <strong>{order.shipping.includes('track_trace') ? 'Track & Trace' : 'Standard shipping'}</strong>
					</p>
					<p className={`address ${order.shipping.includes('track_trace') && 'track_trace'}`}>
						{order.customer.name}
						<br />
						{order.customer.address}
						{order.customer.address2 && `, ${order.customer.address2}`}
						<br />
						{order.customer.zip} {order.customer.city}
						<br />
						{order.customer.country}
						<br />
					</p>
				</div>
			</div>
		</StyledOrder>
	)
}

const OrderList = ({ orders }) => {
	const [sendConfirmationMail] = useMutation(SEND_ORDER_CONFIRMATION_MUTATION)
	const [sendOrderShippedMail] = useMutation(SEND_ORDER_SHIPPED_MAIL_MUTATION)
	const [markAsShipped] = useMutation(MARK_ORDER_AS_SHIPPED_MUTATION)

	const triggerConfirmationMail = orderId => {
		if (window.confirm('Are you sure you want to resend the confirmation mail?')) {
			sendConfirmationMail({
				variables: {
					orderId,
				},
			}).then(({ data }) => {
				if (data) {
					alert('Order confirmation sent')
				} else {
					alert('Something went wrong')
				}
			})
		}
	}

	const triggerOrderShippedMail = orderId => {
		if (window.confirm('Are you sure you want to resend the shipping mail?')) {
			sendOrderShippedMail({
				variables: {
					orderId,
				},
			}).then(({ data }) => {
				if (data) {
					alert('Shipping mail sent')
				} else {
					alert('Something went wrong')
				}
			})
		}
	}

	const triggerMarkAsShipped = (id, shippingMethod) => {
		if (shippingMethod.includes('track_trace')) {
			const trackingCode = window.prompt('Enter the tracking code') // null if cancel, "" if no tracking code
			if (trackingCode !== null) {
				markAsShipped({
					variables: {
						trackingCode,
						id,
					},
					refetchQueries: [{ query: ORDERS_QUERY, variables: {} }],
				}).then(({ data }) => {
					if (data) {
						alert('Order marked as shipped')
					} else {
						alert('Something went wrong')
					}
				})
			}
		} else {
			if (window.confirm('Are you sure you want to mark the order as shipped?')) {
				markAsShipped({
					variables: {
						id,
					},
					refetchQueries: [{ query: ORDERS_QUERY, variables: {} }],
				}).then(({ data }) => {
					if (data) {
						alert('Order marked as shipped')
					} else {
						alert('Something went wrong')
					}
				})
			}
		}
	}

	return (
		<ul>
			{orders.map(order => {
				// console.log(order)
				return (
					<Order
						key={order.id}
						order={order}
						triggerConfirmationMail={triggerConfirmationMail}
						triggerMarkAsShipped={triggerMarkAsShipped}
						triggerOrderShippedMail={triggerOrderShippedMail}
					/>
				)
			})}
		</ul>
	)
}

const OrdersOverview = () => {
	const { loading, error, data } = useQuery(ORDERS_QUERY)

	if (loading) return <p>Loading</p>

	if (!data) return <p>No orders</p>

	const { orders } = data

	return (
		<>
			<h1>Order overview</h1>
			<h2>Open orders</h2>
			<OrderList orders={orders.filter(order => !order.shippedAt)} />
			<h2>Completed orders</h2>
			<OrderList orders={orders.filter(order => order.shippedAt)} />
		</>
	)
}

export { OrdersOverview }
