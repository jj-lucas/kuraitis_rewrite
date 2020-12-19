import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import {
	CartContext,
	CART_QUERY,
	CurrencyContext,
	LocaleContext,
	prettyPrice,
	translate,
	UPDATE_CART_MUTATION
} from '../../../lib'

const Details = ({ product, className, setSKU, SKU }) => {
	const { locale } = React.useContext(LocaleContext)
	const { currency } = React.useContext(CurrencyContext)
	const { cart, setCartOpen } = React.useContext(CartContext)
	const [selectedAttributes, setSelectedAttributes] = useState({})
	const [price, setPrice] = useState(0)

	const [updateCart, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_CART_MUTATION)

	useEffect(() => {
		const defaultState = {}
		Object.keys(attributes).map(key => {
			if (attributes[key][0]) {
				defaultState[key] = attributes[key][0].value
			}
		})
		setSelectedAttributes(defaultState)
		setPrice(product.price[currency])
	}, [])

	useEffect(() => {
		let SKU = product.code
		Object.keys(attributes).map(key => {
			if (key in selectedAttributes) {
				SKU += `-${selectedAttributes[key].toUpperCase()}`
			}
		})
		setSKU(SKU)

		// update price based on SKU
		const variant = product.skus.find(variant => variant.sku.toUpperCase() === SKU)

		if (variant && variant.price && variant.price[currency]) {
			if (price[currency] !== variant.price[currency]) {
				setPrice(variant.price[currency])
			}
		} else {
			setPrice(product.price[currency])
		}
	}, [selectedAttributes])

	useEffect(() => {
		// update price based on SKU
		const variant = product.skus.find(variant => variant.sku.toUpperCase() === SKU)
		if (variant && variant.price && variant.price[currency]) {
			if (price[currency] !== variant.price[currency]) {
				setPrice(variant.price[currency])
			}
		} else {
			setPrice(product.price[currency])
		}
	}, [currency])

	const attributes = JSON.parse(product.selectedAttributes)

	const changeSelectedAttributes = e => {
		e.preventDefault()
		const [key, value] = e.target.value.split('_')
		const currentAttributes = { ...selectedAttributes }
		currentAttributes[key] = value
		setSelectedAttributes(currentAttributes)
	}

	const addToCart = async e => {
		e.preventDefault()
		const sku = product.skus.find(sku => sku.sku === SKU).sku

		console.log(cart)

		await updateCart({
			variables: {
				...(cart ? { id: cart.id } : null),
				items: [...(cart && cart.items ? cart.items.split("|") : []), sku],
			},
			refetchQueries: [{ query: CART_QUERY, variables: {} }],
		}).then(() => {
			setCartOpen(true)
		})
	}

	return (
		<div className={className}>
			<h1>{product[`name_${locale}`]}</h1>
			<h3>{prettyPrice(price, currency)}</h3>
			<form>
				<div className="variants">
					{Object.keys(attributes).map(key => {
						if (key in selectedAttributes)
							return (
								<div key={key}>
									<span>{translate(key, locale).toUpperCase()}</span>
									<select key={key} onChange={changeSelectedAttributes}>
										{attributes[key].map(option => (
											<option key={option.value} value={`${key}_${option.value}`}>
												{translate(option.value, locale).toUpperCase()}
											</option>
										))}
									</select>
								</div>
							)
					})}
				</div>
				<button onClick={addToCart}>{translate('add_to_cart', locale)}</button>
			</form>
			<ReactMarkdown>{product[`description_${locale}`]}</ReactMarkdown>
			<p>SKU: {`${SKU}`}</p>
		</div>
	)
}

const StyledDetails = styled(Details)`
	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		width: 33%;
		min-height: 500px;
		padding-left: 10px;
	}

	.variants {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 30px;

		div {
			span {
				display: block;
			}

			select {
				width: 100%;
				background-color: var(--lightGray);
				border: 1px solid var(--lightishGray);
				padding: 5px 7px;
			}
		}
	}

	button {
		width: 100%;
		margin-top: 15px;
		padding: 15px 7px;
		background-color: var(--black);
		color: var(--lightGray);
		text-transform: uppercase;
		cursor: pointer;
		transition: opacity
			${props => `${props.theme.transition.durations.short} ${props.theme.transition.types.easeInOut}`};

		&:hover {
			opacity: 0.9;
		}
	}
	p {
		white-space: pre-wrap;
	}
`

export default StyledDetails
