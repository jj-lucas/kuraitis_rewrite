import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { prettyPrice, LocaleContext } from '../../../lib'
import { useState, useEffect } from 'react'
import { Picture } from '../../../components'

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

const Gallery = ({ product, className }) => {
	const [selectedImageId, setSelectedImageId] = useState(product.images[0].id)

	const { locale } = React.useContext(LocaleContext)

	const onClickThumb = (e, imageId) => {
		e.preventDefault()
		setSelectedImageId(imageId)
	}

	return (
		<div className={className}>
			<ul>
				{product.images.map(image => (
					<li key={image.id}>
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
			<div className="mainPicture">
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
	display: flex;

	ul {
		margin: 0;
		padding: 0;
		width: ${props => props.theme.sizes.productPage.thumbs};
		list-style: none;

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
		width: calc(100% - ${props => props.theme.sizes.productPage.thumbs});
		text-align: center;

		img {
			max-width: 100%;
		}
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
			<StyledGallery product={data.product} />
			<StyledDetails product={data.product} />
		</Wrapper>
	)
}

export { ProductView }
