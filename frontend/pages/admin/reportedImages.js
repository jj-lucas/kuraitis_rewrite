import { PageAdmin, Button } from '../../components'
import styled from 'styled-components'
import { useQuery, useMutation, gql } from '@apollo/client'

const IMAGE_REPORTS_QUERY = gql`
	query IMAGE_REPORTS_QUERY {
		imageReports {
			id
			image
			url
			message
		}
	}
`

const DELETE_REPORT_MUTATION = gql`
	mutation DELETE_REPORT_MUTATION($id: ID!) {
		deleteReport(id: $id) {
			id
		}
	}
`
const Report = styled.div`
	margin: ${props => props.theme.spacing.base};
	box-shadow: ${props => props.theme.boxShadow.md};
	display: flex;
	position: relative;

	img {
		width: 200px;
	}

	a {
		display: inline-flex;
	}

	p {
		vertical-align: top;
		padding: ${props => props.theme.spacing.sm};
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.ctas {
		position: absolute;
		bottom: 0;
		padding: ${props => props.theme.spacing.sm};
	}
`

const AdminReportedImagesPage = () => {
	const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(IMAGE_REPORTS_QUERY, {})
	const [deleteReport, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_REPORT_MUTATION)

	if (loadingQuery) return <p>Loading..</p>

	const onResolve = async (e, id) => {
		e.preventDefault()

		if (confirm('Are you sure you want to resolve this report?')) {
			deleteReport({
				variables: {
					id,
				},
				refetchQueries: [{ query: IMAGE_REPORTS_QUERY }],
			}).catch(error => {
				console.log(error)
			})
		}
	}

	return (
		<PageAdmin>
			<h1>Reported Images</h1>
			{dataQuery.imageReports.map(report => (
				<Report key={report.id}>
					<a href={report.url} target="_blank">
						<img src={report.image} />
					</a>
					<div className="info">
						<p>{report.message}</p>
						<div className="ctas">
							<Button type="submit" onClick={e => onResolve(e, report.id)}>
								Resolve
							</Button>
						</div>
					</div>
				</Report>
			))}
		</PageAdmin>
	)
}

export default AdminReportedImagesPage
