import styled from 'styled-components'
import { useQuery, useMutation, gql } from '@apollo/client'
import { cloudinaryUrl } from '../../../config'
import { Icon } from '../../../components'

const UPLOAD_IMAGE_MUTATION = gql`
	mutation UPLOAD_IMAGE_MUTATION($image: String!, $largeImage: String!, $categoryId: String!) {
		uploadCategoryImage(image: $image, largeImage: $largeImage, categoryId: $categoryId) {
			id
			image
			largeImage
		}
	}
`

const Drawer = styled.div`
	background: ${props => props.theme.colors.lightGray};
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;

	img {
		width: 100%;
		background: ${props => props.theme.colors.lightGray};
	}

	.image {
		position: relative;
		margin: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm} 0 0;

		svg {
			position: absolute;
			top: 5px;
			right: 5px;
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
				<input type="file" id="file" name="file" placeholder="Upload an image" onChange={uploadFile} />
			</label>

			<Drawer>
				{props.images &&
					props.images.map(image => (
						<div className="image">
							<img src={image.image} />
							<a href="#">
								<Icon name="cross" size="md" inverted />
							</a>
						</div>
					))}
			</Drawer>
		</>
	)
}

export { ImageUploader }
