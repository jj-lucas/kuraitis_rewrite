import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { getDisplayName } from 'next/dist/next-server/lib/utils'

export const CartContext = React.createContext({
	cart: '',
	setCart: () => null,
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

	return <CartContext.Provider value={{ cart: cart || null, setCart: setCart }}>{children}</CartContext.Provider>
}

const withCart = WrappedPage => {
	const withCart = ({ cart, ...pageProps }) => {
		return (
			<CartProvider cart={cart}>
				<WrappedPage {...pageProps} />
			</CartProvider>
		)
	}

	withCart.displayName = `withCart(${getDisplayName(WrappedPage)})`

	return withCart
}

export { withCart, CART_QUERY, UPDATE_CART_MUTATION }
