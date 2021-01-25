import { gql, useQuery } from '@apollo/client'
import { getDisplayName } from 'next/dist/next-server/lib/utils'
import React from 'react'

export const CartContext = React.createContext({
	cart: '',
	setCart: () => null,
	cartOpen: false,
	setCartOpen: () => null,
	shippingProfiles: '',
	setShippingProfiles: () => null,
})

const CART_QUERY = gql`
	query CART {
		cart {
			id
			cartSkus {
				id
				customization
				sku {
					sku
					price {
						DKK
						USD
						EUR
						GBP
					}
					image {
						url
					}
					product {
						price {
							DKK
							USD
							EUR
							GBP
						}
						name_da
						name_en
						selectedAttributes
						images {
							url
						}
					}
				}
			}
		}
		shippingProfiles {
			code
			price {
				DKK
				GBP
				USD
				EUR
			}
		}
	}
`

const ADD_TO_CART_MUTATION = gql`
	mutation ADD_TO_CART_MUTATION($sku: String!, $customization: String) {
		addToCart(sku: $sku, customization: $customization) {
			id
		}
	}
`

const REMOVE_FROM_CART_MUTATION = gql`
	mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
		removeFromCart(id: $id) {
			id
		}
	}
`

const CartProvider = ({ children }) => {
	const [cart, setCart] = React.useState()
	const [shippingProfiles, setShippingProfiles] = React.useState()
	const [cartOpen, setCartOpen] = React.useState(false)
	const { loading, error, data } = useQuery(CART_QUERY)

	React.useEffect(() => {
		if (data) {
			console.log(data)
			setCart(data.cart)
			setShippingProfiles(data.shippingProfiles)
		}
	}, [data])

	return (
		<CartContext.Provider
			value={{
				cart: cart || null,
				setCart: setCart,
				cartOpen,
				setCartOpen,
				shippingProfiles,
			}}>
			{children}
		</CartContext.Provider>
	)
}

const withCart = WrappedPage => {
	const withCart = ({ cart, cartOpen, setCartOpen, shippingProfiles, ...pageProps }) => {
		return (
			<CartProvider cart={cart} cartOpen={cartOpen} setCartOpen={setCartOpen} shippingProfiles={shippingProfiles}>
				<WrappedPage {...pageProps} />
			</CartProvider>
		)
	}

	withCart.displayName = `withCart(${getDisplayName(WrappedPage)})`

	return withCart
}

export { withCart, CART_QUERY, ADD_TO_CART_MUTATION, REMOVE_FROM_CART_MUTATION }
