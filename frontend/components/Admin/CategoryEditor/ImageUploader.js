import styled from 'styled-components'
import { useQuery, useMutation, gql } from '@apollo/client'
import { cloudinaryUrl } from '../../../config'
import { Icon, Form, DisplayError } from '../../../components'

const UPLOAD_IMAGE_MUTATION = gql`
	mutation UPLOAD_IMAGE_MUTATION($image: String!, $largeImage: String!, $categoryId: String!) {
		uploadCategoryImage(image: $image, largeImage: $largeImage, categoryId: $categoryId) {
			id
			image
			largeImage
		}
	}
`

const DELETE_IMAGE_MUTATION = gql`
	mutation DELETE_IMAGE_MUTATION($id: ID!) {
		deleteCategoryImage(id: $id) {
			id
		}
	}
`

const Drawer = styled.div`
	background: ${props => props.theme.colors.lightGray};
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;

	img {
		display: block;
		width: 100%;
		background: ${props => props.theme.colors.lightGray};
	}

	.image {
		position: relative;
		margin: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm} 0 0;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

		a {
			position: absolute;
			top: 5px;
			right: 5px;
		}
	}
`

const ImageUploader = props => {
	const [uploadImage, { loading: loadingUpload, error: errorUpload }] = useMutation(UPLOAD_IMAGE_MUTATION)
	const [deleteImage, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_IMAGE_MUTATION)

	const uploadFile = async e => {
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append('upload_preset', 'sickfits')
		const res = await fetch(cloudinaryUrl, {
			method: 'POST',
			body: data,
		})
		const file = await res.json()

		// register the uploaded asset
		await uploadImage({
			variables: {
				image: file.secure_url,
				largeImage: file.eager[0].secure_url,
				categoryId: props.categoryId,
			},
			refetchQueries: [{ query: props.queryToRefetch, variables: { id: props.categoryId } }],
		})
			.catch(error => {
				console.log(error)
			})
			.then(response => {
				console.log(response.data)
			})
	}

	const handleImageDelete = async imageId => {
		console.log(imageId)
		await deleteImage({
			variables: {
				id: imageId,
			},
			refetchQueries: [{ query: props.queryToRefetch, variables: { id: props.categoryId } }],
		})
	}

	return (
		<Form>
			<fieldset disabled={loadingUpload || loadingDelete} aria-busy={loadingUpload || loadingDelete}>
				<DisplayError error={errorUpload || errorDelete} />

				<h3>Images</h3>
				<label htmlFor="file">
					Image
					<input type="file" id="file" name="file" placeholder="Upload an image" onChange={uploadFile} />
				</label>

				<Drawer>
					{props.images &&
						props.images.map(image => (
							<div className="image" key={image.id}>
								<img src={image.image} />
								<a href="#" onClick={e => handleImageDelete(image.id)}>
									<Icon name="cross" size="md" inverted />
								</a>
							</div>
						))}
				</Drawer>
			</fieldset>
		</Form>
	)
}

export { ImageUploader }
