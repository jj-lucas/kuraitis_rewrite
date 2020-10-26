import { gql, useMutation } from '@apollo/client'
import StripeCheckout from 'react-stripe-checkout'

const CREATE_ORDER_MUTATION = gql`
	mutation CREATE_ORDER_MUTATION(
		$cartId: String!
		$currency: String!
		$token: String!
		$locale: String!
		$shipping: String!
		$email: String!
		$name: String!
		$address: String!
		$address2: String
		$city: String!
		$zip: String!
		$country: String!
	) {
		createOrder(
			cartId: $cartId
			currency: $currency
			token: $token
			locale: $locale
			shipping: $shipping
			email: $email
			name: $name
			address: $address
			address2: $address2
			city: $city
			zip: $zip
			country: $country
		) {
			id
			auth
		}
	}
`

const Payment = ({ children, amount, image, currency, cartId, locale, shipping }) => {
	const [createOrder] = useMutation(CREATE_ORDER_MUTATION)

	console.log(shipping)
	const onToken = async res => {
		console.log('onToken called', res)

		await createOrder({
			variables: {
				cartId,
				currency,
				token: res.id,
				locale,
				...shipping,
			},
		}).then(({ data }) => {
			console.log(data)
			window.location = `/${locale}/order/${data.createOrder.id}?t=${data.createOrder.auth}`
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
