import { gql, useMutation } from '@apollo/client'
import StripeCheckout from 'react-stripe-checkout'

const CREATE_ORDER_MUTATION = gql`
	mutation CREATE_ORDER_MUTATION($cartId: String!, $currency: String!, $token: String!, $locale: String!) {
		createOrder(cartId: $cartId, currency: $currency, token: $token, locale: $locale) {
			id
		}
	}
`

const Payment = ({ children, amount, image, currency, cartId, locale }) => {
	const [createOrder] = useMutation(CREATE_ORDER_MUTATION)

	const onToken = async res => {
		console.log('onToken called', res)
		await createOrder({
			variables: {
				cartId,
				currency,
				token: res.id,
				locale,
			},
		}).then(data => {
			console.log(data)
		})
	}

	return (
		<StripeCheckout
			amount={amount * 100}
			email={'lucas@lucsali.com'}
			name="Sergio Kuraitis - Naturligt Design"
			stripeKey="pk_test_51GzQONHqFvOKDhGmsF50x344v3iwL4AY9faQGOQXAWokWrPXdtoja88f2pCRlN9yb0aFjRpo7mXfDwB5CVUL6See00GJkIQAKe"
			description={`Order description`}
			token={null}
			image={image}
			currency={currency}
			token={onToken}>
			{children}
		</StripeCheckout>
	)
}

export { Payment }
