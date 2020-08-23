import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	margin-bottom: -80px;
	height: 500px;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		height: 500px;
	}

	@media (min-width: ${props => props.theme.breakpoints.xl}) {
		height: 700px;
	}
`

const Slide = styled.div`
	margin: 0 auto;
	height: 100%;
	width: 100%;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: top center;
    max-width: 2700px;
    

    background-image: url('/images/slider/${props => props.image}-small.jpg');
    
	@media (min-width: ${props => props.theme.breakpoints.sm}) {
        background-image: url('/images/slider/${props => props.image}-medium.jpg');
	}
    
	@media (min-width: ${props => props.theme.breakpoints.xl}) {
        background-image: url('/images/slider/${props => props.image}-large.jpg');
	}
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
