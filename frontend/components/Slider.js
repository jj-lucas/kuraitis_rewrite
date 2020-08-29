import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	margin-bottom: -80px;
	text-align: center;

	img {
		width: 100%;

		@media (min-width: ${props => props.theme.breakpoints.xl}) {
			max-height: 890px;
			width: auto;
			margin: 0 auto;
		}
	}
`

const Slider = props => {
	return (
		<Container>
			{props.slides.map(image => (
				<img
					srcset={`
						/images/slider/${image}-small.jpg 680w,
						/images/slider/${image}-medium.jpg 1024w,
						/images/slider/${image}-large.jpg 1600w,
					`}
					sizes={`
						(max-width: 680px) 680px,
						(max-width: 1025px) 1024px,
						1600px
					`}
					src={`/images/slider/${image}-medium.jpg`}
				/>
			))}
		</Container>
	)
}

export default Slider
