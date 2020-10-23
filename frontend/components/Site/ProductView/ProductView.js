import styled from 'styled-components'
import { useQuery, useMutation, gql } from '@apollo/client'
import {
	prettyPrice,
	LocaleContext,
	CurrencyContext,
	CartContext,
	CART_QUERY,
	UPDATE_CART_MUTATION,
	translate,
} from '../../../lib'
import { useState, useEffect, useRef } from 'react'
import { Picture, Icon } from '../../../components'
import Head from 'next/head'

const PRODUCT_BY_CODE = gql`
	query PRODUCT_BY_CODE($code: String) {
		product(code: $code) {
			id
			code
			name_da
			name_en
			price {
				DKK
				USD
				EUR
				GBP
			}
			description_da
			description_en
			selectedAttributes
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
					id
				}
			}
			images {
				id
				image
				largeImage
			}
		}
	}
`
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 30px;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		flex-direction: row;
	}
`

const GalleryButton = styled.a`
	width: 60px;
	display: flex;
	justify-content: center;
	text-align: center;
	background: var(--lightGray);
	border: 1px solid var(--lightishGray);
	margin: 0 10px;
	padding: 4px 0;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		width: 100px;
		margin: 10px 0;
	}

	${props =>
		!props.visible &&
		`
        opacity: 0.2;
        pointer-events: none;
    `}

	@media (max-width: ${props => props.theme.breakpoints.sm}) {
		&.verticalNav {
			display: none;
		}
	}

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		&.horizontalNav {
			display: none;
		}
	}
`

const Gallery = ({ product, className, SKU }) => {
	const [selectedImageId, setSelectedImageId] = useState(product.images[0].id)
	const [offset, setOffset] = useState(0)

	const refMainPicture = useRef(null)
	const refThumbs = useRef(null)

	const [thumbsInView, setThumbsInView] = useState(0)
	const [thumbWidth, setThumbWidth] = useState(0)

	useEffect(() => {
		setInterval(function () {
			// update layout based on how many thumbs fit in the current view
			if (refMainPicture.current) {
				// 84 = height of thumb, 6 = max thumbs
				const thumbsThatFit = Math.min(parseInt(refMainPicture.current.clientHeight / 84, 10), 5)
				if (thumbsInView !== thumbsThatFit) {
					setThumbsInView(thumbsThatFit)
				}
			}
			if (refThumbs.current) {
				// 4 = thumbs in mobile view
				const calculatedWidth = refThumbs.current.clientWidth / 4
				if (calculatedWidth !== thumbWidth) {
					setThumbWidth(calculatedWidth)
				}
			}
		}, 500)
	}, [])

	useEffect(() => {
		const sku = product.skus.find(sku => sku.sku === SKU)
		if (sku && sku.image) {
			setSelectedImageId(sku.image.id)
		}
	}, [SKU])

	const { locale } = React.useContext(LocaleContext)

	const onClickThumb = (e, imageId) => {
		e.preventDefault()
		setSelectedImageId(imageId)
	}

	const onArrowUp = e => {
		e.preventDefault()
		// don't go negative
		setOffset(Math.max(offset - thumbsInView, 0))
	}

	const onArrowDown = e => {
		e.preventDefault()
		// don't go beyond the max
		setOffset(Math.min(offset + thumbsInView, product.images.length))
	}

	return (
		<div className={className}>
			<div className="mainPicture" ref={refMainPicture}>
				<Picture
					source={product.images.find(image => image.id === selectedImageId).image}
					alt={product[`name_${locale}`]}
				/>
			</div>
			<div className="thumbs">
				<GalleryButton className={'verticalNav'} href="#" onClick={onArrowUp} visible={offset > 0}>
					<Icon name="chevronUp" />
				</GalleryButton>
				<GalleryButton className={'horizontalNav'} href="#" onClick={onArrowUp} visible={offset > 0}>
					<Icon name="chevronLeft" />
				</GalleryButton>
				<ul style={thumbsInView ? { height: `calc(84 * ${thumbsInView}px)` } : { height: 0 }} ref={refThumbs}>
					{product.images.map((image, index) => (
						<li
							key={image.id}
							style={
								index == 0
									? {
											marginTop: `calc(-84 * ${offset}px)`,
											marginLeft: `calc(-${thumbWidth} * ${offset}px)`,
											width: `calc(${thumbWidth}px)`,
									  }
									: { width: `calc(${thumbWidth}px)` }
							}>
							<a
								href="#"
								className={image.id === selectedImageId ? 'selected' : ''}
								onClick={e => {
									onClickThumb(e, image.id)
								}}>
								<img src={image.image} alt={product[`name_${locale}`]} />
							</a>
						</li>
					))}
				</ul>
				<GalleryButton
					href="#"
					className={'verticalNav'}
					onClick={onArrowDown}
					visible={offset < Math.min(product.images.length - thumbsInView)}>
					<Icon name="chevronDown" />
				</GalleryButton>
				<GalleryButton
					href="#"
					className={'horizontalNav'}
					onClick={onArrowDown}
					visible={offset < Math.min(product.images.length - thumbsInView)}>
					<Icon name="chevronRight" />
				</GalleryButton>
			</div>
		</div>
	)
}

const StyledGallery = styled(Gallery)`
	width: 100%;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		width: 67%;
	}

	ul {
		margin: 0;
		padding: 0;
		overflow: hidden;
		list-style: none;
		display: flex;
		flex-direction: row;
		width: 100%;

		@media (max-width: ${props => props.theme.breakpoints.sm}) {
			height: auto !important;
			margin-top: 0 !important;
		}

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			flex-direction: column;
			width: ${props => props.theme.sizes.productPage.thumbs};
		}

		li {
			flex-shrink: 0;
			@media (max-width: ${props => props.theme.breakpoints.sm}) {
				margin-top: 0 !important;
			}
			@media (min-width: ${props => props.theme.breakpoints.sm}) {
				margin-left: 0 !important;
			}

			@media (min-width: ${props => props.theme.breakpoints.sm}) {
				height: 84px;
				width: auto !important;
			}
		}
		li:first-of-type {
			transition: margin
				${props => `${props.theme.transition.durations.short} ${props.theme.transition.types.easeInOut}`};
		}

		a {
			display: block;
			opacity: 0.5;
			transition: opacity
				${props => `${props.theme.transition.durations.short} ${props.theme.transition.types.easeInOut}`};

			&:hover {
				opacity: 1;
			}

			&.selected {
				opacity: 1;
			}
		}
		img {
			width: 100%;
		}
	}

	.mainPicture {
		width: 100%;
		margin-bottom: 10px;
		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			width: calc(100% - ${props => props.theme.sizes.productPage.thumbs} - 12px);
		}
		text-align: center;
		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			float: right;
			padding-left: 10px;
		}

		img {
			max-width: 100%;
		}
	}

	.thumbs {
		display: flex;

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			display: block;
			float: left;
		}
	}
`

const Details = ({ product, className, setSKU, SKU }) => {
	const { locale } = React.useContext(LocaleContext)
	const { currency } = React.useContext(CurrencyContext)
	const { cart } = React.useContext(CartContext)
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
				SKU += `-${selectedAttributes[key]}`
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

		await updateCart({
			variables: {
				...(cart ? { id: cart.id } : null),
				items: [...(cart ? cart.items : []), sku],
			},
			refetchQueries: [{ query: CART_QUERY, variables: {} }],
		}).then(() => {
			// window.location = '/admin/products'
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
			{product[`description_${locale}`].split('\n\n').map(paragraph => (
				<p key={paragraph.substring(0, 10)}>{paragraph}</p>
			))}
			<p>SKU: {`${SKU}`}</p>
		</div>
	)
}

const StyledDetails = styled(Details)`
	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		width: 33%;
		min-height: 500px;
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

const ProductView = ({ code, cart }) => {
	const [SKU, setSKU] = useState('')
	const { locale } = React.useContext(LocaleContext)

	const { loading, error, data } = useQuery(PRODUCT_BY_CODE, {
		variables: { code },
	})

	if (loading) return <p>Loading</p>

	return (
		<Wrapper>
			<StyledGallery product={data.product} offset={2} SKU={SKU} />
			<StyledDetails product={data.product} SKU={SKU} setSKU={setSKU} />
			<Head>
				<title>{data.product[`name_${locale}`]} | Sergio Kuraitis: Naturligt Design</title>
			</Head>
		</Wrapper>
	)
}

export { ProductView }
