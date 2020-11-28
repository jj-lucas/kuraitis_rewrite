import { gql, useMutation } from '@apollo/client'
import arrayMove from 'array-move'
import { MdDeleteForever } from 'react-icons/md'
import styled from 'styled-components'
import { DisplayError, SortableItem, SortableList } from '../../components'
import { cloudinaryUrl } from '../../config'

const CREATE_IMAGE_MUTATION = gql`
	mutation CREATE_IMAGE_MUTATION($url: String!, $largeUrl: String!, $categoryId: ID, $productId: ID) {
		createImage(url: $url, largeUrl: $largeUrl, categoryId: $categoryId, productId: $productId) {
			id
			url
			largeUrl
		}
	}
`

const DELETE_IMAGE_MUTATION = gql`
	mutation DELETE_IMAGE_MUTATION($id: ID!) {
		deleteImage(id: $id) {
			message
		}
	}
`

const Tile = styled.div`
	position: relative;
	box-shadow: ${props => props.theme.boxShadow.md};

	img {
		display: block;
		width: 100%;
		background: var(--lightGray);
	}

	.remove {
		position: absolute;
		top: 10px;
		right: 10px;
	}
`

const StyledTrashIcon = styled(MdDeleteForever)`
	background: white;
	color: black;
	padding: 3px;
	border-radius: 13px;
	cursor: pointer;
`

const ImageUploader = props => {
	const [uploadImage, { loading: loadingUpload, error: errorUpload }] = useMutation(CREATE_IMAGE_MUTATION)
	const [deleteImage, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_IMAGE_MUTATION)

	const id = props.categoryId || props.productId || null

	const onFileUpload = async e => {
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		if (props.categoryId) {
			data.append('upload_preset', 'kuraitis_category')
		} else if (props.productId) {
			data.append('upload_preset', 'kuraitis_product')
		}
		const res = await fetch(cloudinaryUrl, {
			method: 'POST',
			body: data,
		})
		const file = await res.json()

		let variables = {
			url: file.secure_url,
			largeUrl: file.eager[0].secure_url,
		}
		if (props.categoryId) {
			variables.categoryId = props.categoryId
		} else if (props.productId) {
			variables.productId = props.productId
		}

		// register the uploaded asset
		await uploadImage({
			variables,
			refetchQueries: [{ query: props.queryToRefetch, variables: { id } }],
		})
			.catch(error => {
				console.log(error)
			})
			.then(response => {
				console.log(response.data)
			})
	}

	const onSortEnd = async ({ oldIndex, newIndex }) => {
		const reorderedImages = arrayMove(props.images, oldIndex, newIndex)
		props.setImages(reorderedImages)
	}

	const onImageDelete = async imageId => {
		await deleteImage({
			variables: {
				id: imageId,
			},
			refetchQueries: [{ query: props.queryToRefetch, variables: { id } }],
		})
	}

	const loading = loadingUpload || loadingDelete
	const error = errorUpload || errorDelete

	return (
		<fieldset disabled={loading} aria-busy={loading}>
			<DisplayError error={error} />

			<h3>Images</h3>
			<label htmlFor="file">
				Image
				<input type="file" id="file" name="file" placeholder="Upload an image" onChange={onFileUpload} />
			</label>

			<SortableList onSortEnd={onSortEnd} axis="xy" distance={1}>
				{props.images &&
					props.images.map((image, index) => (
						<SortableItem key={image.id} index={index}>
							<Tile>
								<img src={image.url} />
								<a
									className="remove"
									href="#"
									onClick={e => {
										e.preventDefault()
										onImageDelete(image.id)
									}}>
									<StyledTrashIcon size={20} />
								</a>
							</Tile>
						</SortableItem>
					))}
			</SortableList>
		</fieldset>
	)
}

export { ImageUploader }

