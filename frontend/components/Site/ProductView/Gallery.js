import { useEffect, useRef, useState } from 'react'
import { MdChevronLeft, MdChevronRight, MdExpandLess, MdExpandMore } from 'react-icons/md'
import styled from 'styled-components'
import { Picture } from '../../../components'
import { LocaleContext } from '../../../lib'

const GalleryButton = styled.a`
	width: 6rem;
	display: flex;
	justify-content: center;
	text-align: center;
	background: var(--lightGray);
	border: 1px solid var(--lightishGray);
	margin: 0 1rem;
	padding: 4px 0;
	position: relative;
	color: var(--black);

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		width: 10rem;
		margin: 1rem 0;
	}

	${props =>
		!props.visible &&
		`
        opacity: 0.2;
        pointer-events: none;
    `}

	@media (max-width: ${props => props.theme.breakpoints.sm}) {
		svg {
			position: absolute;
			top: 50%;
			-ms-transform: translateY(-50%);
			transform: translateY(-50%);
		}
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
					source={product.images.find(image => image.id === selectedImageId).url}
					alt={product[`name_${locale}`]}
				/>
			</div>
			<div className="thumbs">
				<GalleryButton className={'verticalNav'} href="#" onClick={onArrowUp} visible={offset > 0}>
					<MdExpandLess size={20} />
				</GalleryButton>
				<GalleryButton className={'horizontalNav'} href="#" onClick={onArrowUp} visible={offset > 0}>
					<MdChevronLeft size={20} />
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
								<img src={image.url} alt={product[`name_${locale}`]} />
							</a>
						</li>
					))}
				</ul>
				<GalleryButton
					href="#"
					className={'verticalNav'}
					onClick={onArrowDown}
					visible={offset < Math.min(product.images.length - thumbsInView)}>
					<MdExpandMore size={20} />
				</GalleryButton>
				<GalleryButton
					href="#"
					className={'horizontalNav'}
					onClick={onArrowDown}
					visible={offset < Math.min(product.images.length - thumbsInView)}>
					<MdChevronRight size={20} />
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

export default StyledGallery
