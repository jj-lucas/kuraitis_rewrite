import { gql, useMutation } from '@apollo/client'
import StripeCheckout from 'react-stripe-checkout'
import { stripePublicKey } from '../../config'

const CREATE_ORDER_MUTATION = gql`
	mutation CREATE_ORDER_MUTATION(
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
		}
	}
`

const Payment = ({ children, amount, image, currency, locale, shipping }) => {
	const [createOrder] = useMutation(CREATE_ORDER_MUTATION)

	console.log(shipping)
	const onToken = async res => {
		console.log('onToken called', res)

		await createOrder({
			variables: {
				currency,
				token: res.id,
				locale,
				...shipping,
			},
		}).then(({ data }) => {
			console.log(data)
			window.location = `/${locale}/order/${data.createOrder.id}`
		})
	}

	return (
		<StripeCheckout
			amount={amount * 100}
			email={'lucas@lucsali.com'}
			name="Sergio Kuraitis - Naturligt Design"
			stripeKey={stripePublicKey}
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

