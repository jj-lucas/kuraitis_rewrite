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

const AdminReportedImagesPage = () => {
	const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(IMAGE_REPORTS_QUERY, {})

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

	if (loadingQuery) return <p>Loading..</p>

	const reports = dataQuery.imageReports
	return (
		<PageAdmin>
			<h1>Reported Images</h1>
			{reports.map(report => (
				<Report key={report.id}>
					<a href={report.url} target="_blank">
						<img src={report.image} />
					</a>
					<div classsName="info">
						<p>{report.message}</p>
						<div className="ctas">
							<Button type="submit">Resolve</Button>
						</div>
					</div>
				</Report>
			))}
		</PageAdmin>
	)
}

export default AdminReportedImagesPage
