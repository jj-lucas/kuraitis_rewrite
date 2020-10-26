import { OrdersOverview, PageAdmin } from '../../components'

const AdminOrdersPage = props => {
	return (
		<PageAdmin>
			<OrdersOverview {...props} />
		</PageAdmin>
	)
}

export default AdminOrdersPage
