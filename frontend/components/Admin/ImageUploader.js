import { gql, useMutation } from '@apollo/client'
import arrayMove from 'array-move'
import { MdDeleteForever } from 'react-icons/md'
import styled from 'styled-components'
import { DisplayError, SortableItem, SortableList } from '../../components'
import { cloudinaryUrl } from '../../config'

const CREATE_PRODUCT_IMAGE_MUTATION = gql`
	mutation CREATE_PRODUCT_IMAGE_MUTATION(
		$mainUrl: String!
		$thumbUrl: String!
		$adminUrl: String!
		$cartUrl: String!
		$galleryUrl: String!
		$productId: ID
	) {
		createProductImage(
			mainUrl: $mainUrl
			thumbUrl: $thumbUrl
			adminUrl: $adminUrl
			cartUrl: $cartUrl
			galleryUrl: $galleryUrl
			productId: $productId
		) {
			id
			mainUrl
			thumbUrl
			adminUrl
			cartUrl
			galleryUrl
		}
	}
`

const CREATE_CATEGORY_IMAGE_MUTATION = gql`
	mutation CREATE_CATEGORY_IMAGE_MUTATION($thumbUrl: String!, $adminUrl: String!, $categoryId: ID) {
		createCategoryImage(thumbUrl: $thumbUrl, adminUrl: $adminUrl, categoryId: $categoryId) {
			id
			thumbUrl
			adminUrl
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
	const [uploadProductImage, { loading: loadingProductUpload, error: errorProductUpload }] = useMutation(
		CREATE_PRODUCT_IMAGE_MUTATION
	)
	const [uploadCategoryImage, { loading: loadingCategoryUpload, error: errorCategoryUpload }] = useMutation(
		CREATE_CATEGORY_IMAGE_MUTATION
	)
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

		if (props.categoryId) {
			// register the uploaded asset
			await uploadCategoryImage({
				variables: {
					categoryId: props.categoryId,
					thumbUrl: file.secure_url,
					adminUrl: file.eager[0].secure_url,
				},
				refetchQueries: [{ query: props.queryToRefetch, variables: { id } }],
			})
				.catch(error => {
					console.log(error)
				})
				.then(response => {
					console.log(response.data)
				})
		} else if (props.productId) {
			// register the uploaded asset
			await uploadProductImage({
				variables: {
					productId: props.productId,
					mainUrl: file.secure_url,
					thumbUrl: file.eager[0].secure_url,
					adminUrl: file.eager[1].secure_url,
					cartUrl: file.eager[2].secure_url,
					galleryUrl: file.eager[3].secure_url,
				},
				refetchQueries: [{ query: props.queryToRefetch, variables: { id } }],
			})
				.catch(error => {
					console.log(error)
				})
				.then(response => {
					console.log(response.data)
				})
		}
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

	const loading = loadingProductUpload || loadingDelete
	const error = errorProductUpload || errorDelete

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
								<img src={image.adminUrl} />
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
