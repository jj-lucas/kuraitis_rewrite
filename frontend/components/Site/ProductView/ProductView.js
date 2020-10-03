import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { prettyPrice, LocaleContext } from '../../../lib'
import { useState, useEffect, useRef } from 'react'
import { Picture, Icon } from '../../../components'

const PRODUCT_BY_CODE = gql`
	query PRODUCT_BY_CODE($code: String) {
		product(code: $code) {
			id
			code
			name_da
			name_en
			description_da
			description_en
			skus {
				id
				sku
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
`

const GalleryButton = styled.a`
	width: 100px;
	display: block;
	text-align: center;
	background: ${props => props.theme.colors.lightGray};
	border: 1px solid ${props => props.theme.colors.lightishGray};
	margin: 10px 0;
	padding: 4px 0;

	${props =>
		!props.visible &&
		`
        opacity: 0;
        pointer-events: none;
    `}
`

const Gallery = ({ product, className }) => {
	const [selectedImageId, setSelectedImageId] = useState(product.images[0].id)
	const [offset, setOffset] = useState(0)

	const [height, setHeight] = useState(0)
	const ref = useRef(null)

	const [thumbsInView, setThumbsInView] = useState(0)

	useEffect(() => {
		setInterval(function () {
			if (ref.current) {
				const h = ref.current.clientHeight
				setThumbsInView(parseInt(h / 84, 10))
			}
		}, 300)
	})

	const { locale } = React.useContext(LocaleContext)

	const onClickThumb = (e, imageId) => {
		e.preventDefault()
		setSelectedImageId(imageId)
	}

	const onArrowUp = e => {
		e.preventDefault()
		setOffset(Math.max(offset - thumbsInView, 0))
	}

	const onArrowDown = e => {
		e.preventDefault()
		setOffset(Math.min(offset + thumbsInView, product.images.length))
	}

	return (
		<div className={className}>
			<div className="thumbs">
				<GalleryButton href="#" onClick={onArrowUp} visible={offset > 0}>
					<Icon name="chevronUp" />
				</GalleryButton>
				<ul style={thumbsInView ? { height: `calc(84 * ${thumbsInView}px)` } : {}}>
					{product.images.map((image, index) => (
						<li key={image.id} style={index == 0 ? { marginTop: `calc(-84 * ${offset}px)` } : {}}>
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
				<GalleryButton href="#" onClick={onArrowDown} visible={offset < Math.min(product.images.length - thumbsInView)}>
					<Icon name="chevronDown" />
				</GalleryButton>
			</div>
			<div className="mainPicture" ref={ref}>
				<Picture
					source={product.images.find(image => image.id === selectedImageId).image}
					alt={product[`name_${locale}`]}
				/>
			</div>
		</div>
	)
}

const StyledGallery = styled(Gallery)`
	width: 67%;

	ul {
		margin: 0;
		padding: 0;
		width: ${props => props.theme.sizes.productPage.thumbs};
		overflow: hidden;
		list-style: none;

		li {
			height: 84px;
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
		width: calc(100% - ${props => props.theme.sizes.productPage.thumbs} - 2px);
		text-align: center;
		float: right;

		img {
			max-width: 100%;
		}
	}

	.thumbs {
		float: left;
	}
`

const Details = ({ product, className }) => {
	const { locale } = React.useContext(LocaleContext)
	return (
		<div className={className}>
			<h1>{product[`name_${locale}`]}</h1>
		</div>
	)
}

const StyledDetails = styled(Details)`
	background: green;
	width: 33%;
	height: 500px;
`

const ProductView = ({ code }) => {
	const { loading, error, data } = useQuery(PRODUCT_BY_CODE, {
		variables: { code },
	})

	if (loading) return <p>Loading</p>

	return (
		<Wrapper>
			<StyledGallery product={data.product} offset={2} />
			<StyledDetails product={data.product} />
		</Wrapper>
	)
}

export { ProductView }
