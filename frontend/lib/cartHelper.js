import { gql, useQuery } from '@apollo/client'
import { getDisplayName } from 'next/dist/next-server/lib/utils'
import React from 'react'

export const CartContext = React.createContext({
	cart: '',
	setCart: () => null,
	cartOpen: false,
	setCartOpen: () => null,
})

const CART_QUERY = gql`
	query CART {
		cart {
			id
			items
			skus {
				id
				sku
				price {
					DKK
					USD
					EUR
					GBP
				}
				image {
					image
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
					images {
						image
					}
				}
			}
		}
	}
`

const UPDATE_CART_MUTATION = gql`
	mutation UPDATE_CART($id: ID, $items: [String!]) {
		updateCart(id: $id, items: $items) {
			id
		}
	}
`

const CartProvider = ({ children }) => {
	const [cart, setCart] = React.useState()
	const [cartOpen, setCartOpen] = React.useState(false)
	const { loading, error, data } = useQuery(CART_QUERY)

	/*
	React.useEffect(() => {
		if (cart && cart !== localStorage.getItem('cart')) {
			localStorage.setItem('cart', cart)
		}
	}, [cart])

	React.useEffect(() => {
		if (localStorage.getItem('cart')) {
			setCart(localStorage.getItem('cart'))
		}
    }, [])
    */

	React.useEffect(() => {
		if (data) {
			setCart(data.cart)
		}
	}, [data])

	return (
		<CartContext.Provider value={{ cart: cart || null, setCart: setCart, cartOpen, setCartOpen }}>
			{children}
		</CartContext.Provider>
	)
}

const withCart = WrappedPage => {
	const withCart = ({ cart, cartOpen, setCartOpen, ...pageProps }) => {
		return (
			<CartProvider cart={cart} cartOpen={cartOpen} setCartOpen={setCartOpen}>
				<WrappedPage {...pageProps} />
			</CartProvider>
		)
	}

	withCart.displayName = `withCart(${getDisplayName(WrappedPage)})`

	return withCart
}

export { withCart, CART_QUERY, UPDATE_CART_MUTATION }
