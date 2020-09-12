import User from '../../components/User'

const IndexPage = props => {
	return (
		<>
			<h1>Super secret admin page</h1>
			<User>{({ me }) => <>Hello {me && me.name}</>}</User>
		</>
	)
}

export default IndexPage
