import { gql, useMutation, useQuery } from '@apollo/client'
import { MdError } from 'react-icons/md'
import styled from 'styled-components'
import { User } from '.'

const REPORTS_QUERY = gql`
	query REPORTS_QUERY {
		reports {
			image
			message
		}
	}
`

const CREATE_REPORT_MUTATION = gql`
	mutation CREATE_REPORT_MUTATION($image: String!, $url: String!, $message: String!) {
		createReport(image: $image, url: $url, message: $message) {
			id
			image
			url
			message
		}
	}
`

const StyledIcon = styled(MdError)`
	position: absolute;
	top: 10px;
	left: calc(50% - 8px);
	background: white;
	padding: 5px;
	border-radius: 13px;
	cursor: pointer;

	${props => props.reported && `opacity: 1 !important;`}
	${props =>
		props.reported &&
		`
		opacity: 1;
		background: rgba(255, 0, 0, 0.3);
		color: white;
	`}
`
const Report = props => {
	const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(REPORTS_QUERY, {})
	const [createReport, { loading, error }] = useMutation(CREATE_REPORT_MUTATION)

	const onClick = async e => {
		e.preventDefault()

		// is there an existing report?
		if (props.image in existingReports) {
			alert(existingReports[props.image])
		} else {
			// prompt new report
			const message = prompt('What is wrong?')
			if (message != null) {
				await createReport({
					variables: {
						image: props.image,
						url: document.location.href,
						message,
					},
				})
					.catch(error => {
						console.log(error)
					})
					.then(response => {
						console.log(response.data.createReport)
					})
			}
		}
	}

	if (loadingQuery) return <></>

	const existingReports = {}
	dataQuery.reports.map(report => {
		existingReports[report.image] = report.message
	})

	return (
		<User>
			{({ me }) =>
				me && (
					<>
						{(me.permissions.includes('ADMIN') || me.permissions.includes('REPORTCREATE')) && (
							<span onClick={onClick}>
								<StyledIcon size={20} reported={props.image in existingReports ? 'reported' : null} />
							</span>
						)}
					</>
				)
			}
		</User>
	)
}

export { Report }
