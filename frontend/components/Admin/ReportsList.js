import { gql, useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { Button } from '../../components'

const REPORTS_QUERY = gql`
	query REPORTS_QUERY {
		reports {
			id
			imageUrl
			url
			description
		}
	}
`

const DELETE_REPORT_MUTATION = gql`
	mutation DELETE_REPORT_MUTATION($id: ID!) {
		deleteReport(id: $id) {
			message
		}
	}
`
const Report = styled.div`
	margin: 2rem;
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
		padding: 1rem;
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.ctas {
		position: absolute;
		bottom: 0;
		padding: 1rem;
	}
`

const ReportsList = () => {
	const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(REPORTS_QUERY, {})
	const [deleteReport, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_REPORT_MUTATION)

	if (loadingQuery) return <p>Loading..</p>

	const onResolve = async (e, id) => {
		e.preventDefault()

		if (confirm('Are you sure you want to resolve this report?')) {
			deleteReport({
				variables: {
					id,
				},
				refetchQueries: [{ query: REPORTS_QUERY }],
			}).catch(error => {
				console.log(error)
			})
		}
	}

	return (
		<>
			{dataQuery.reports.map(report => (
				<Report key={report.id}>
					<a href={report.url} target="_blank">
						<img src={report.imageUrl} />
					</a>
					<div className="info">
						<p>{report.description}</p>
						<div className="ctas">
							<Button type="submit" onClick={e => onResolve(e, report.id)}>
								Resolve
							</Button>
						</div>
					</div>
				</Report>
			))}
		</>
	)
}

export { ReportsList }

