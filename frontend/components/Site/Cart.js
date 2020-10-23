import { useMutation } from '@apollo/client'
import { XCircleIcon } from '@primer/octicons-react'
import styled from 'styled-components'
import { CartContext, CART_QUERY, CurrencyContext, prettyPrice, UPDATE_CART_MUTATION } from '../../lib'

const StyledCart = styled.div`
	position: fixed;
	z-index: 10;
	width: 600px;
	top: 50vh;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	padding: 2rem;
	box-shadow: ${props => props.theme.boxShadow.lg};

	img {
		width: 50px;
	}
`
const Cart = () => {
	const { cart } = React.useContext(CartContext)
	const { currency } = React.useContext(CurrencyContext)
	const [updateCart, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_CART_MUTATION)

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

	return (
		<StyledCart>
			<h1>Cart</h1>
			<ul>
				{cart &&
					cart.items &&
					cart.items.map((sku, index) => {
						const skuData = cart.skus.find(candidate => candidate.sku == sku)
						const image = skuData.image ? skuData.image.image : skuData.product.images[0].image
						const price = skuData.price || skuData.product.price
						return (
							<li key={index}>
								<img src={image} alt="" />
								{prettyPrice(price[currency], currency)}
								{sku}
								<span
									onClick={e => {
										e.preventDefault()
										removeFromCart(index)
									}}>
									<XCircleIcon />
								</span>
							</li>
						)
					})}
			</ul>
		</StyledCart>
	)
}

export { Cart }
