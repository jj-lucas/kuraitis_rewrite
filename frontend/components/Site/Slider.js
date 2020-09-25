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

const Slider = props => {
	return (
		<Container>
			{props.slides.map(image => (
				<Picture
					key={image}
					sources={[
						`/images/slider/${image}-small.jpg`,
						`/images/slider/${image}-medium.jpg`,
						`/images/slider/${image}-large.jpg`,
					]}
					alt={props.alt}></Picture>
			))}
		</Container>
	)
}

export { Slider }
