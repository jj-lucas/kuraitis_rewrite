import styled from 'styled-components'

const ContentSection = styled.div`
	position: relative;
	max-width: ${props => props.theme.maxWidth};

	margin: 0 auto;
	padding: 1px 30px;

	background: white;

	> section {
		max-width: ${props => props.theme.maxWidth};
		margin: auto 20px;
	}
`

export { ContentSection }
