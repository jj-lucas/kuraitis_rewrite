import styled from 'styled-components'
import { useMutation, gql } from '@apollo/client'
import { cloudinaryUrl } from '../../config'
import { Icon, Form, DisplayError, SortableList, SortableItem } from '../../components'
import arrayMove from 'array-move'
import { useState, useEffect } from 'react'

const UPLOAD_IMAGE_MUTATION = gql`
	mutation UPLOAD_IMAGE_MUTATION($image: String!, $largeImage: String!, $categoryId: ID) {
		uploadImage(image: $image, largeImage: $largeImage, categoryId: $categoryId) {
			id
			image
			largeImage
		}
	}
`

const DELETE_IMAGE_MUTATION = gql`
	mutation DELETE_IMAGE_MUTATION($id: ID!) {
		deleteImage(id: $id) {
			id
		}
	}
`

const SORT_IMAGES_MUTATION = gql`
	mutation SORT_IMAGES_MUTATION($images: [ID]) {
		sortImages(images: $images) {
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
		background: ${props => props.theme.colors.lightGray};
	}

	.remove {
		position: absolute;
		top: 5px;
		right: 5px;
	}
`

const ImageUploader = props => {
	const [uploadImage, { loading: loadingUpload, error: errorUpload }] = useMutation(UPLOAD_IMAGE_MUTATION)
	const [deleteImage, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_IMAGE_MUTATION)
	const [sortImages, { loading: loadingSort, error: errorSort }] = useMutation(SORT_IMAGES_MUTATION)

	const [images, setImages] = useState([])

	useEffect(() => {
		setImages(props.images)
	}, [props.images])

	const id = props.categoryId || props.productId || null

	const onFileUpload = async e => {
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append('upload_preset', 'kuraitis_category')
		const res = await fetch(cloudinaryUrl, {
			method: 'POST',
			body: data,
		})
		const file = await res.json()

		let variables = {
			image: file.secure_url,
			largeImage: file.eager[0].secure_url,
			categoryId: props.id,
		}
		// register the uploaded asset
		await uploadImage({
			variables,
			refetchQueries: [{ query: props.queryToRefetch, variables: { id: props.id } }],
		})
			.catch(error => {
				console.log(error)
			})
			.then(response => {
				console.log(response.data)
			})
	}

	const onSortEnd = async ({ oldIndex, newIndex }) => {
		const reorderedImages = arrayMove(images, oldIndex, newIndex)
		setImages(reorderedImages)

		await sortImages({
			variables: {
				images: reorderedImages.map(image => image.id),
			},
		})
			.catch(error => {
				console.log(error)
			})
			.then(response => {
				console.log(response.data.sortImages.message)
			})
	}

	const onImageDelete = async imageId => {
		await deleteImage({
			variables: {
				id: imageId,
			},
			refetchQueries: [{ query: props.queryToRefetch, variables: { id: props.id } }],
		})
	}

	const loading = loadingUpload || loadingDelete || loadingSort
	const error = errorUpload || errorDelete || errorSort

	return (
		<Form>
			<fieldset disabled={loading} aria-busy={loading}>
				<DisplayError error={error} />

				<h3>Images</h3>
				<label htmlFor="file">
					Image
					<input type="file" id="file" name="file" placeholder="Upload an image" onChange={onFileUpload} />
				</label>

				<SortableList onSortEnd={onSortEnd} axis="xy" distance={1}>
					{images &&
						images.map((image, index) => (
							<SortableItem key={image.id} index={index}>
								<Tile>
									<img src={image.image} />
									<a
										className="remove"
										href="#"
										onClick={e => {
											e.preventDefault()
											onImageDelete(image.id)
										}}>
										<Icon name="cross" size="md" inverted />
									</a>
								</Tile>
							</SortableItem>
						))}
				</SortableList>
			</fieldset>
		</Form>
	)
}

export { ImageUploader }
