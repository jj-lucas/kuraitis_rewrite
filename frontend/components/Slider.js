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
				<picture>
					<source srcset={`/images/slider/${image}-large.jpg`} media="(min-width: 1024px)" />
					<source srcset={`/images/slider/${image}-medium.jpg`} media="(min-width: 680px)" />
					<source srcset={`/images/slider/${image}-small.jpg`} />
					<img src={`/images/slider/${image}-medium.jpg`} alt={props.alt} />
				</picture>
			))}
		</Container>
	)
}

export default Slider
