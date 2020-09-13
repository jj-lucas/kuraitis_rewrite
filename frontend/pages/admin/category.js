import { PageAdmin, DisplayError, Form } from '../../components'
import { useQuery, useMutation, gql } from '@apollo/client'
import { languages, cloudinaryUrl } from '../../config'

const SINGLE_CATEGORY_QUERY = gql`
	query SINGLE_CATEGORY_QUERY($id: ID!) {
		getCategoryInfo(id: $id ) {
			id
            ${languages.map(lang => 'name_' + lang.id)}
            ${languages.map(lang => 'slug_' + lang.id)}
            ${languages.map(lang => 'description_' + lang.id)}
            images {
                image
            }
		}
	}
`

const UPDATE_CATEGORY_MUTATION = gql`
	mutation UPDATE_CATEGORY_MUTATION(
        $id: ID!, 
        ${languages.map(lang => '$slug_' + lang.id + ': String,')}
        ${languages.map(lang => '$name_' + lang.id + ': String,')}
        ${languages.map(lang => '$description_' + lang.id + ': String,')}
        $images: [String]
        ) {
		updateCategory(id: $id,
            ${languages.map(lang => 'slug_' + lang.id + ': $slug_' + lang.id + ',')}
            ${languages.map(lang => 'name_' + lang.id + ': $name_' + lang.id + ',')}
            ${languages.map(lang => 'description_' + lang.id + ': $description_' + lang.id + ',')}
            images: $images
        ) {
			id
            ${languages.map(lang => 'name_' + lang.id)}
            ${languages.map(lang => 'slug_' + lang.id)}
            ${languages.map(lang => 'description_' + lang.id)}
		}
	}
`

const UPLOAD_IMAGE_MUTATION = gql`
	mutation UPLOAD_IMAGE_MUTATION($image: String!, $largeImage: String!, $categoryId: String!) {
		uploadCategoryImage(image: $image, largeImage: $largeImage, categoryId: $categoryId) {
			id
			image
			largeImage
		}
	}
`

const AdminCategoryPage = props => {
	const [changes, setChanges] = React.useState({})
	const [images, setImages] = React.useState([])

	const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(SINGLE_CATEGORY_QUERY, {
		variables: { id: props.query.id },
	})

	const [updateCategoryMutation, { data: dataMutation, loading: loadingMutation, error: errorMutation }] = useMutation(
		UPDATE_CATEGORY_MUTATION
	)

	const [
		uploadImageMutation,
		{ data: dataImageUploadMutation, loading: loadingImageUploadMutation, error: errorImageUploadMutation },
	] = useMutation(UPLOAD_IMAGE_MUTATION)

	if (loadingQuery) return <p>Loading</p>

	const category = dataQuery && dataQuery.getCategoryInfo

	const handleChange = e => {
		const { name, type, value } = e.target
		const val = type === 'number' ? parseFloat(value) : value
		setChanges({
			...changes,
			[name]: val,
		})
	}

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
		await uploadImageMutation({
			variables: {
				image: file.secure_url,
				largeImage: file.eager[0].secure_url,
				categoryId: props.query.id,
			},
		})
			.catch(error => {
				console.log(error)
			})
			.then(response => {
				console.log(response.data)
			})
	}

	const loading = loadingQuery || loadingMutation

	return (
		<PageAdmin>
			{!category && <p>No category found for ID {props.query.id}</p>}
			{category && (
				<>
					<h1>Edit category: {category.name_da}</h1>

					<Form
						onSubmit={async e => {
							e.preventDefault()
							const updates = { ...category, ...changes }
							delete updates.__typename
							await updateCategoryMutation({
								variables: { ...category, ...changes },
								refetchQueries: [{ query: SINGLE_CATEGORY_QUERY, variables: { id: props.query.id } }],
							}).catch(error => {
								console.log(error)
							})
						}}>
						<DisplayError error={errorQuery || errorMutation} />

						<h3>Images</h3>
						<label htmlFor="file">
							Image
							<input type="file" id="file" name="file" placeholder="Upload an image" required onChange={uploadFile} />
						</label>
						{category.images && category.images.map(image => <img src={image.image} />)}

						{languages.map(lang => (
							<div key={lang.id}>
								<h3>{lang.pretty}</h3>
								<fieldset disabled={loading} aria-busy={loading}>
									<label htmlFor={`slug_${lang.id}`}>
										Slug
										<input
											type="text"
											id={`slug_${lang.id}`}
											name={`slug_${lang.id}`}
											placeholder="Slug"
											required
											defaultValue={category[`slug_${lang.id}`]}
											onChange={handleChange}
										/>
									</label>
									<label htmlFor={`name_${lang.id}`}>
										Name
										<input
											type="text"
											id={`name_${lang.id}`}
											name={`name_${lang.id}`}
											placeholder="Title"
											required
											defaultValue={category[`name_${lang.id}`]}
											onChange={handleChange}
										/>
									</label>
									<label htmlFor={`description_${lang.id}`}>
										Description
										<textarea
											type="text"
											id={`description_${lang.id}`}
											name={`description_${lang.id}`}
											rows={4}
											placeholder="Description"
											defaultValue={category[`description_${lang.id}`]}
											onChange={handleChange}
										/>
									</label>
								</fieldset>
							</div>
						))}
						<button type="submit">Save</button>
					</Form>
				</>
			)}
		</PageAdmin>
	)
}

export default AdminCategoryPage
