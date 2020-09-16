import styled from 'styled-components'
import { useQuery, useMutation, gql } from '@apollo/client'
import { cloudinaryUrl } from '../../../config'

const UPLOAD_IMAGE_MUTATION = gql`
	mutation UPLOAD_IMAGE_MUTATION($image: String!, $largeImage: String!, $categoryId: String!) {
		uploadCategoryImage(image: $image, largeImage: $largeImage, categoryId: $categoryId) {
			id
			image
			largeImage
		}
	}
`

const ImageUploader = props => {
	const [uploadImage, { data, loading, error }] = useMutation(UPLOAD_IMAGE_MUTATION)

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

	return (
		<>
			<h3>Images</h3>
			<label htmlFor="file">
				Image
				<input type="file" id="file" name="file" placeholder="Upload an image" required onChange={uploadFile} />
			</label>
			{props.images && props.images.map(image => <img src={image.image} />)}
		</>
	)
}

export { ImageUploader }
