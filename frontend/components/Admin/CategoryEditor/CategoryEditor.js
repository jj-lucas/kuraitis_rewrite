import { DisplayError, Form } from '../../../components'
import { ImageUploader } from '.'
import { useQuery, useMutation, gql } from '@apollo/client'
import { languages } from '../../../config'

const SINGLE_CATEGORY_QUERY = gql`
	query SINGLE_CATEGORY_QUERY($id: ID!) {
		category(id: $id ) {
			id
			published
            ${languages.map(lang => 'name_' + lang.id)}
            ${languages.map(lang => 'slug_' + lang.id)}
            ${languages.map(lang => 'description_' + lang.id)}
            images {
				id
                image
            }
		}
	}
`

const UPDATE_CATEGORY_MUTATION = gql`
	mutation UPDATE_CATEGORY_MUTATION(
        $id: ID!,
		$published: Boolean, 
        ${languages.map(lang => '$slug_' + lang.id + ': String,')}
        ${languages.map(lang => '$name_' + lang.id + ': String,')}
        ${languages.map(lang => '$description_' + lang.id + ': String,')}
        $images: [String]
        ) {
		updateCategory(
			id: $id,
			published: $published,
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

const DELETE_CATEGORY_MUTATION = gql`
	mutation DELETE_CATEGORY_MUTATION($id: ID!) {
		deleteCategory(id: $id) {
			id
		}
	}
`

const CategoryEditor = props => {
	const [changes, setChanges] = React.useState({})

	const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(SINGLE_CATEGORY_QUERY, {
		variables: { id: props.query.id },
	})

	const [updateCategory, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_CATEGORY_MUTATION)
	const [deleteCategory, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_CATEGORY_MUTATION)

	if (loadingQuery) return <p>Loading</p>

	const category = dataQuery && dataQuery.category

	const handleChange = e => {
		const { name, type, value } = e.target
		let val
		switch (type) {
			case 'number':
				val = parseFloat(value)
				break
			case 'checkbox':
				val = e.target.checked
				break
			default:
				val = value
				break
		}
		setChanges({
			...changes,
			[name]: val,
		})
	}

	const handleDelete = async e => {
		e.preventDefault()
		if (confirm('Are you sure you want to delete this category?')) {
			await deleteCategory({
				variables: {
					id: props.query.id,
				},
			}).then(() => {
				window.location = '/admin/categories'
			})
		}
	}

	const loading = loadingQuery || loadingUpdate || loadingDelete

	return (
		<>
			{!category && <p>No category found for ID {props.query.id}</p>}
			{category && (
				<>
					<h1>Edit category: {category.name_da}</h1>

					<ImageUploader categoryId={props.query.id} images={category.images} queryToRefetch={SINGLE_CATEGORY_QUERY} />

					<Form
						onSubmit={async e => {
							e.preventDefault()
							const updates = { ...category, ...changes }
							delete updates.__typename
							delete updates.images
							await updateCategory({
								variables: updates,
								refetchQueries: [{ query: SINGLE_CATEGORY_QUERY, variables: { id: props.query.id } }],
							}).catch(error => {
								console.log(error)
							})
						}}>
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
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="published">
								<input
									type="checkbox"
									id="published"
									name="published"
									defaultChecked={category.published}
									onChange={handleChange}
								/>
								Published
							</label>
						</fieldset>
						<DisplayError error={errorQuery || errorUpdate} />
						<button
							onClick={e => {
								e.preventDefault()
								window.history.back()
							}}>
							Cancel
						</button>
						<button type="submit">Save</button>
						<button className="warning" onClick={handleDelete}>
							Delete
						</button>
					</Form>
				</>
			)}
		</>
	)
}

export { CategoryEditor }
