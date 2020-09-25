import React from 'react'
import styled from 'styled-components'
import { Picture } from '../../components'

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

const StyledPicture = styled(Picture)`
	width: 100%;
	height: 100%;
	display: block;
`

const Slider = props => {
	return (
		<Container>
			{props.slides.map(image => (
				<StyledPicture
					key={image}
					sources={[
						`/images/slider/${image}-small.jpg`,
						`/images/slider/${image}-medium.jpg`,
						`/images/slider/${image}-large.jpg`,
					]}
					alt={props.alt}></StyledPicture>
			))}
		</Container>
	)
}

export { Slider }
