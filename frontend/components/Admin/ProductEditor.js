import { DisplayError, Form, ImageUploader } from '../../components'
import { useQuery, useMutation, gql } from '@apollo/client'
import { languages } from '../../config'
import Select from 'react-select'

const PRODUCT_BY_ID_QUERY = gql`
	query PRODUCT_BY_ID_QUERY($id: ID!) {
		product(id: $id) {
			id
			code
            published
			images {
				id
				image
			}
            categories {
                id
                name_da
            }
            ${languages.map(lang => 'name_' + lang.id)}
            ${languages.map(lang => 'slug_' + lang.id)} 
            ${languages.map(lang => 'description_' + lang.id)}
		}
        categories {
            id
            name_da
        }
	}
`

const UPDATE_PRODUCT_MUTATION = gql`
	mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!,
        $code: String,
		$published: Boolean, 
        $categories: [ID]
        ${languages.map(lang => '$slug_' + lang.id + ': String,')}
        ${languages.map(lang => '$name_' + lang.id + ': String,')}
        ${languages.map(lang => '$description_' + lang.id + ': String,')}
        ) {
		updateProduct(
			id: $id,
            code: $code,
			published: $published,
            categories: $categories,
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

const ProductEditor = props => {
	const [changes, setChanges] = React.useState({})

	const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(PRODUCT_BY_ID_QUERY, {
		variables: { id: props.query.id },
	})

	const [updateProduct, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_PRODUCT_MUTATION)
	const [deleteCategory, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_CATEGORY_MUTATION)

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

	const handleCategoryChange = categories => {
		setChanges({
			...changes,
			categories: categories ? categories.map(cat => cat.value) : [],
		})
	}

	const handleDelete = async e => {
		e.preventDefault()
		if (confirm('Are you sure you want to delete this category?')) {
			await deleteCategory({
				variables: {
					id: props.query.idd,
				},
			}).then(() => {
				window.location = '/admin/products'
			})
		}
	}

	const onSubmit = async e => {
		e.preventDefault()
		const updates = { ...product, ...changes }

		// frontend validation
		try {
			if (updates.published) {
				// make a list of required fields for a product to be published
				let necessaryFields = ['code']
				for (const fields of ['slug', 'name', 'description'].map(f => languages.map(l => `${f}_${l.id}`))) {
					necessaryFields.push(...fields)
				}
				for (const field of necessaryFields) {
					if (!updates[field]) {
						throw new Error(`You cannot publish a product without a ${field}`)
					}
				}

				if (!updates.images || !updates.images.length) {
					throw new Error(`You cannot publish a product without images`)
				}
			}
		} catch (err) {
			alert(err)
			return false
		}

		delete updates.__typename
		delete updates.images

		await updateProduct({
			variables: updates,
			refetchQueries: [{ query: PRODUCT_BY_ID_QUERY, variables: { id: props.query.id } }],
		})
	}

	if (loadingQuery) return <p>Loading</p>

	const product = dataQuery && dataQuery.product
	const loading = loadingQuery || loadingUpdate || loadingDelete

	return (
		<>
			{!product && <p>No product found for ID {props.query.id}</p>}
			{product && (
				<>
					<h1>Edit product: {product.name_da}</h1>

					<ImageUploader productId={props.query.id} images={product.images} queryToRefetch={PRODUCT_BY_ID_QUERY} />

					<Form onSubmit={onSubmit}>
						<fieldset disabled={loading} aria-busy={loading}>
							<h3>Details</h3>
							<label htmlFor="code">
								Code
								<input type="text" id="code" name="code" defaultValue={product['code']} onChange={handleChange} />
							</label>
							<label htmlFor="categories">
								Categories
								<Select
									isMulti
									id="categories"
									name="categories"
									defaultValue={dataQuery.product.categories.map(cat => {
										return { value: cat.id, label: cat.name_da }
									})}
									onChange={handleCategoryChange}
									options={dataQuery.categories.map(category => {
										return { value: category.id, label: category.name_da }
									})}
								/>
							</label>
						</fieldset>
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
											defaultValue={product[`slug_${lang.id}`]}
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
											defaultValue={product[`name_${lang.id}`]}
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
											defaultValue={product[`description_${lang.id}`]}
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
									defaultChecked={product.published}
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

export { ProductEditor }
