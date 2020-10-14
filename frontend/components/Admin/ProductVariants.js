import Select from 'react-select'
import styled from 'styled-components'
import { Icon } from '../../components'

const StyledFieldset = styled.fieldset`
	button[type='submit'] {
		margin-top: ${props => props.theme.spacing.base};
	}
	.SKUs {
		margin-top: ${props => props.theme.spacing.base};
	}
`

const StyledSKU = styled.li`
	list-style: none;
	display: grid;
	padding: 5px 0 5px;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 10px;
	border-bottom: 1px solid gray;

	.sku {
		margin-top: 2px;
	}

	&&& {
		input {
			width: 50px;
			border: transparent;
			background: white;
			margin-left: 10px;

			::placeholder {
				/* Chrome, Firefox, Opera, Safari 10.1+ */
				color: gray;
				opacity: 0.5; /* Firefox */
			}
		}
	}

	img {
		width: 100px;
	}

	svg {
		padding-left: 5px;
		padding-top: 3px;
	}

	button.remove {
		background: ${props => props.theme.colors.warning};
	}
`

const SKU = ({ sku, defaultPrice, onChangeSku, value, image, productImages }) => {
	const [showImageModal, setShowImageModal] = React.useState(false)

	const onChangePrice = e => {
		onChangeSku(sku, {
			price: {
				DKK: e.target.value,
			},
		})
	}
	const onChangeImage = e => {
		e.preventDefault()

		setShowImageModal(true)
	}

	const onDeleteImage = e => {
		e.preventDefault()

		onChangeSku(sku, {
			image: null,
		})
	}

	return (
		<>
			<StyledSKU>
				<span className="sku">{sku}</span>
				<span>
					Precio:
					<input
						name="price"
						placeholder={defaultPrice}
						type="text"
						onChange={onChangePrice}
						autoComplete="off"
						value={value > 0 ? value : ''}
					/>
				</span>
				<span>
					<button onClick={onChangeImage}>{image ? 'Change image' : 'Select image'}</button>
					{image && <Icon name="cross" onClick={onDeleteImage} />}
				</span>
				<span>
					<img src={image && image.image} />
				</span>
			</StyledSKU>
			<ImageModal
				images={productImages}
				show={showImageModal}
				setShow={setShowImageModal}
				onChangeSku={onChangeSku}
				sku={sku}
				selectedImage={image && image.id}
			/>
		</>
	)
}

const ProductVariants = props => {
	const [editing, setEditing] = React.useState(false)

	const {
		availableAttributes,
		defaultPrice,
		SKUs,
		setSKUs,
		selectedAttributes,
		setSelectedAttributes,
		productCode,
	} = props

	const onChangeVariants = (attribute, options) => {
		const update = { ...selectedAttributes }
		update[attribute] = options || []
		setSelectedAttributes(update)
	}

	const onEditVariants = e => {
		e.preventDefault()
		setEditing(true)
	}

	const onSaveVariants = e => {
		e.preventDefault()

		// generate SKUs
		const skuFragments = [[productCode]]
		availableAttributes.map(attribute => {
			if (selectedAttributes[attribute.name] && selectedAttributes[attribute.name].length) {
				skuFragments.push(selectedAttributes[attribute.name].map(option => option.value))
			}
		})
		const updatedSKUs = doExchange(skuFragments).map(sku => {
			const existingSku = SKUs.find(existing => existing.sku === sku)
			return {
				sku,
				price: existingSku ? existingSku.price : null,
				image: existingSku ? existingSku.image : null,
			}
		})

		// update parent
		setSKUs(updatedSKUs)

		setEditing(false)
	}

	const onChangeSku = (sku, data) => {
		const updatedSKUs = props.SKUs.map(entry =>
			entry.sku === sku
				? {
						...entry,
						...data,
				  }
				: entry
		)
		// update parent
		props.setSKUs(updatedSKUs)
	}

	// courtesy of https://www.programmersought.com/article/83641162742/
	const doExchange = arr => {
		const len = arr.length
		// When the array is greater than or equal to 2
		if (len >= 2) {
			// the length of the first array
			const len1 = arr[0].length
			// the length of the second array
			const len2 = arr[1].length
			// the number of combinations produced by 2 arrays
			const lenBoth = len1 * len2
			// Declare a new array, do data temporary storage
			const items = new Array(lenBoth)
			// Declare the index of the new array
			let index = 0
			// 2 levels of nested loops, put the combination into a new array
			for (let i = 0; i < len1; i++) {
				for (let j = 0; j < len2; j++) {
					items[index] = arr[0][i] + '-' + arr[1][j]
					index++
				}
			}
			// Put the newly combined array into the original array
			const newArr = new Array(len - 1)
			for (let i = 2; i < arr.length; i++) {
				newArr[i - 1] = arr[i]
			}
			newArr[0] = items
			// Perform callback
			return doExchange(newArr)
		} else {
			return arr[0]
		}
	}

	return (
		<StyledFieldset>
			<h3>Product variants</h3>

			{editing && (
				<>
					{availableAttributes &&
						availableAttributes.map(attribute => (
							<div key={attribute.id}>
								<p>Select {attribute.name}</p>
								<Select
									isMulti
									id={attribute.name}
									name={attribute.name}
									defaultValue={selectedAttributes[attribute.name]}
									onChange={options => onChangeVariants(attribute.name, options)}
									options={attribute.options.split('|').map(option => {
										return { value: option, label: option }
									})}
								/>
							</div>
						))}
					<button type="submit" onClick={onSaveVariants}>
						Save variants
					</button>
				</>
			)}

			{!editing && <button onClick={onEditVariants}>Edit variants</button>}

			<div className="SKUs">
				<h3>SKUs</h3>
				<ul>
					{SKUs.map(entry => (
						<SKU
							key={entry.sku}
							sku={entry.sku}
							image={entry.image}
							defaultPrice={defaultPrice}
							value={(entry.price && entry.price.DKK) || null}
							onChangeSku={onChangeSku}
							productImages={props.images}
						/>
					))}
				</ul>
			</div>
		</StyledFieldset>
	)
}

const StyledImageModal = styled.div`
	display: none;
	position: fixed;
	z-index: 10;
	width: 600px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	padding: ${props => props.theme.spacing.base};
	box-shadow: ${props => props.theme.boxShadow.lg};

	&.active {
		display: block;
	}

	ul {
		list-style: none;
		display: grid;
		padding: 0;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-gap: 30px;

		a {
			opacity: 0.5;
			transition: opacity ${props => props.theme.transition.durations.short}
				${props => props.theme.transition.types.cubic};

			&:hover {
				opacity: 1;
			}

			&.selected {
				opacity: 1;

				img {
					border-color: gray;
				}
			}
		}

		img {
			width: 100%;
			border: 3px solid white;
		}
	}
`

const ImageModal = ({ images, show, setShow, onChangeSku, sku, selectedImage }) => {
	const onImageSelect = (e, imageId) => {
		e.preventDefault()

		onChangeSku(sku, {
			image: images.find(image => image.id === imageId),
		})

		setShow(false)
	}

	return (
		<StyledImageModal className={show ? 'active' : ''}>
			<h2>Select image</h2>
			<ul>
				{images.map(entry => (
					<a
						href="#"
						key={entry.id}
						className={entry.id === selectedImage && 'selected'}
						onClick={e => onImageSelect(e, entry.id)}>
						<img src={entry.image} />
					</a>
				))}
			</ul>
		</StyledImageModal>
	)
}

export { ProductVariants }
