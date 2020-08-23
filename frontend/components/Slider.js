import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	height: ${props => props.theme.maxSliderHeight};
	margin-bottom: -80px;
`

const Slide = styled.div`
	max-width: ${props => props.theme.maxSliderWidth};
	margin: 0 auto;
	background-image: url(${props => props.image});
	height: 100%;
	width: 100%;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
`

const Slider = props => {
	return (
		<Container>
			{props.slides.map(image => (
				<Slide image={image} />
			))}
		</Container>
	)
}

export default Slider
