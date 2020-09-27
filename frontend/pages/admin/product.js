import { ProductEditor, PageAdmin } from '../../components'

const AdminProductPage = props => {
	return (
		<PageAdmin>
			<ProductEditor {...props} />
		</PageAdmin>
	)
}

export default AdminProductPage
