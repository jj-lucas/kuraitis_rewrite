import styled from 'styled-components'

const ContentSection = styled.div`
	margin: 0 auto;
	padding: 1px 30px;
	max-width: ${props => props.theme.maxWidth};
	position: relative;
	background: white;

	> section {
		margin: auto 20px;
		max-width: ${props => props.theme.maxWidth};
	}
`

export default ContentSection
