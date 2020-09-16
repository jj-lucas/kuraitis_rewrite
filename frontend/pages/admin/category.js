import { CategoryEditor, PageAdmin } from '../../components'

const AdminCategoryPage = props => {
	return (
		<PageAdmin>
			<CategoryEditor {...props} />
		</PageAdmin>
	)
}

export default AdminCategoryPage
