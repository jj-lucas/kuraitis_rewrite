import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import {
	CartContext,
	CART_QUERY,
	CurrencyContext,
	LocaleContext,
	prettyPrice,
	translate,
	ADD_TO_CART_MUTATION,
} from '../../../lib'

const Details = ({ product, className, setSKU, SKU }) => {
	const { locale } = React.useContext(LocaleContext)
	const { currency } = React.useContext(CurrencyContext)
	const { cart, setCartOpen } = React.useContext(CartContext)
	const [selectedAttributes, setSelectedAttributes] = useState({})
	const [customization, setCustomization] = useState('')
	const [price, setPrice] = useState(0)

	const [addToCart, { loading: loadingAdding, error: errorAdding }] = useMutation(ADD_TO_CART_MUTATION)

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

	const changeCustomization = e => {
		e.preventDefault()
		if (/^[a-zA-Z]*$/g.test(e.target.value)) {
			setCustomization(e.target.value.substring(0, 3))
		}
	}

	const addItemToCart = async e => {
		e.preventDefault()
		const sku = product.skus.find(sku => sku.sku === SKU).sku

		await addToCart({
			variables: {
				sku,
				customization,
			},
			refetchQueries: [{ query: CART_QUERY, variables: {} }],
		}).then(() => {
			setCartOpen(true)
		})
	}

	return (
		<div className={className}>
			<h1>{product[`name_${locale}`]}</h1>
			<h3>
				{prettyPrice(price, currency)}
				<small>{translate('vat_included', locale)}</small>
			</h3>
			{(locale === 'da' || currency === 'DKK') && (
				<p>
					<b>Fri levering</b> til Danmark.
				</p>
			)}

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
					{product.customizable && (
						<div className="customization">
							<span>{translate('customization', locale).toUpperCase()}</span>
							<input type="text" onChange={changeCustomization} value={customization} />
						</div>
					)}
				</div>

				<button onClick={addItemToCart}>{translate('add_to_cart', locale)}</button>
			</form>
			<ReactMarkdown>{product[`description_${locale}`]}</ReactMarkdown>
			{product.customizable && (
				<>
					{locale === 'en' ? (
						<p>
							<strong>Customize your product</strong>
							<br />
							We can add up to three initials to each item which can be embossed by pressure onto the surface of the
							leather, adding a unique touch of individuality and personality. Request such customization in the
							"customization" field above.
						</p>
					) : (
						<p>
							<strong>Gør dit køb personligt</strong>
							<br />
							Vi kan tilføje op til tre initialer til dit produkt, som enten kan presses ind i læderoverfladen. Så dit
							køb bliver ekstra personligt og unikt. Anmod om sådan tilpasning i feltet "tilpasning" ovenfor.
						</p>
					)}
				</>
			)}
			<p>
				<strong>SKU:</strong> {SKU}
			</p>
		</div>
	)
}

const StyledDetails = styled(Details)`
	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		width: 33%;
		min-height: 50rem;
		padding-left: 1rem;
	}

	h1 {
		font-size: ${props => props.theme.typography.fs.h2};
		margin-top: 0;
	}

	h3 {
		font-size: ${props => props.theme.typography.fs.h2};
		margin-bottom: 1rem;

		small {
			font-weight: ${props => props.theme.typography.fw.light};
			margin-left: 1rem;
		}
	}

	.variants {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem 3rem;

		div {
			span {
				display: block;
			}

			select {
				width: 100%;
				background-color: var(--lightGray);
				border: 1px solid var(--lightishGray);
				padding: 0.5rem;
			}

			input {
				width: 86%;
				background-color: var(--lightGray);
				border: 1px solid var(--lightishGray);
				padding: 0.75rem;
				text-transform: uppercase;
			}
		}
	}

	button {
		width: 100%;
		margin-top: 1.5rem;
		padding: 1rem;
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
