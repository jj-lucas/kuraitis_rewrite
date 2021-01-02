import { MdDeleteForever } from 'react-icons/md'
import Select from 'react-select'
import styled from 'styled-components'
import { Modal } from '../../components'

const StyledFieldset = styled.fieldset`
	button[type='submit'] {
		margin-top: 2rem;
	}
	.SKUs {
		margin-top: 2rem;
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
		background: var(--warning);
	}
`

const StyledTrashIcon = styled(MdDeleteForever)`
	background: white;
	color: black;
	padding: 3px;
	border-radius: 13px;
	cursor: pointer;
`
const SKU = ({ sku, defaultPrice, onChangeSku, value, image, productImages }) => {
	const [openImageModal, setOpenImageModal] = React.useState(false)

	const onChangePrice = e => {
		onChangeSku(sku, {
			price: {
				DKK: e.target.value,
			},
		})
	}
	const onChangeImage = e => {
		e.preventDefault()

		setOpenImageModal(true)
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
					{image && (
						<span onClick={onDeleteImage}>
							<StyledTrashIcon size={20} />
						</span>
					)}
				</span>
				<span>
					<img src={image && image.url} />
				</span>
			</StyledSKU>

			<Modal open={openImageModal} setOpen={setOpenImageModal} title="Select image">
				<ImageModalContent
					images={productImages}
					setOpen={setOpenImageModal}
					onChangeSku={onChangeSku}
					sku={sku}
					selectedImage={image && image.id}
				/>
			</Modal>
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
		console.log(sku, data)
		const updatedSKUs = props.SKUs.map(entry =>
			entry.sku === sku
				? {
						...entry,
						...data,
				  }
				: entry
		)
		console.log(updatedSKUs)
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

const ImageModalContent = ({ images, setOpen, onChangeSku, sku, selectedImage }) => {
	const onImageSelect = (e, imageId) => {
		e.preventDefault()

		onChangeSku(sku, {
			image: images.find(image => image.id === imageId),
		})

		setOpen(false)
	}

	return (
		<>
			<ul>
				{images.map(entry => (
					<a
						href="#"
						key={entry.id}
						className={entry.id === selectedImage && 'selected'}
						onClick={e => onImageSelect(e, entry.id)}>
						<img src={entry.url} />
					</a>
				))}
			</ul>
		</>
	)
}

export { ProductVariants }
