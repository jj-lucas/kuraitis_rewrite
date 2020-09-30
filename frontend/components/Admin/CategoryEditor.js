import { DisplayError, Form, ImageUploader } from '../../components'
import { useQuery, useMutation, gql } from '@apollo/client'
import { languages } from '../../config'
import { useState, useEffect } from 'react'

const CATEGORY_BY_ID_QUERY = gql`
	query CATEGORY_BY_ID_QUERY($id: ID!) {
		category(id: $id ) {
			id
			published
            images(orderBy:sorting_ASC) {
				id
                image
            }
            ${languages.map(lang => 'name_' + lang.id)}
            ${languages.map(lang => 'slug_' + lang.id)} 
            ${languages.map(lang => 'description_' + lang.id)}
		}
	}
`

const UPDATE_CATEGORY_MUTATION = gql`
	mutation UPDATE_CATEGORY_MUTATION(
        $id: ID!,
		$published: Boolean, 
        $images: [ID],
        ${languages.map(lang => '$slug_' + lang.id + ': String,')}
        ${languages.map(lang => '$name_' + lang.id + ': String,')}
        ${languages.map(lang => '$description_' + lang.id + ': String,')}
        ) {
		updateCategory(
			id: $id,
			published: $published,
            images: $images,
            ${languages.map(lang => 'slug_' + lang.id + ': $slug_' + lang.id + ',')}
            ${languages.map(lang => 'name_' + lang.id + ': $name_' + lang.id + ',')}
            ${languages.map(lang => 'description_' + lang.id + ': $description_' + lang.id + ',')}
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

	const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(CATEGORY_BY_ID_QUERY, {
		variables: { id: props.query.id },
	})
	const [updateCategory, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_CATEGORY_MUTATION)
	const [deleteCategory, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_CATEGORY_MUTATION)

	const [images, setImages] = useState([])

	const category = dataQuery && dataQuery.category
	const loading = loadingQuery || loadingUpdate || loadingDelete

	useEffect(() => {
		if (category && category.images) {
			setImages(category.images)
		}
	}, [category])

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

	const onSubmit = async e => {
		e.preventDefault()
		const updates = { ...category, ...changes }
		updates.images = images.map(image => image.id)

		// frontend validation
		if (updates.published) {
			// make a list of required fields for a product to be published
			let necessaryFields = []
			for (const fields of ['slug', 'name'].map(f => languages.map(l => `${f}_${l.id}`))) {
				necessaryFields.push(...fields)
			}
			for (const field of necessaryFields) {
				if (!updates[field]) {
					throw new Error(`You cannot publish a category without a ${field}`)
				}
			}

			if (!updates.images || !updates.images.length) {
				throw new Error(`You cannot publish a category without images`)
			}
		}

		delete updates.__typename

		await updateCategory({
			variables: updates,
			refetchQueries: [{ query: CATEGORY_BY_ID_QUERY, variables: { id: props.query.id } }],
		}).catch(error => {
			console.log(error)
		})
	}

	if (loadingQuery) return <p>Loading</p>

	return (
		<>
			{!category && <p>No category found for ID {props.query.id}</p>}
			{category && (
				<>
					<h1>Edit category: {category.name_da}</h1>

					<Form onSubmit={onSubmit}>
						<ImageUploader
							images={images}
							setImages={setImages}
							categoryId={props.query.id}
							queryToRefetch={CATEGORY_BY_ID_QUERY}
						/>

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
											required={lang.required}
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
