import { DisplayError, Form } from '../../../components'
import { ImageUploader } from '.'
import { useQuery, useMutation, gql } from '@apollo/client'
import { languages } from '../../../config'

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

const CategoryEditor = props => {
	const [changes, setChanges] = React.useState({})

	const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(SINGLE_CATEGORY_QUERY, {
		variables: { id: props.query.id },
	})

	const [updateCategory, { data: dataMutation, loading: loadingMutation, error: errorMutation }] = useMutation(
		UPDATE_CATEGORY_MUTATION
	)

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

	const loading = loadingQuery || loadingMutation

	return (
		<>
			{!category && <p>No category found for ID {props.query.id}</p>}
			{category && (
				<>
					<h1>Edit category: {category.name_da}</h1>

					<Form
						onSubmit={async e => {
							e.preventDefault()
							const updates = { ...category, ...changes }
							delete updates.__typename
							await updateCategory({
								variables: { ...category, ...changes },
								refetchQueries: [{ query: SINGLE_CATEGORY_QUERY, variables: { id: props.query.id } }],
							}).catch(error => {
								console.log(error)
							})
						}}>
						<DisplayError error={errorQuery || errorMutation} />

						<ImageUploader
							categoryId={props.query.id}
							images={category.images}
							queryToRefetch={SINGLE_CATEGORY_QUERY}
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
		</>
	)
}

export { CategoryEditor }