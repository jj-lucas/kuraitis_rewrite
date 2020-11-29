import styled from 'styled-components'
import { Report, User } from '../../components'

const StyledPicture = styled.picture`
	position: relative;
	display: block;

	svg {
		opacity: 0;
		transition: all ${props => `${props.theme.transition.durations.long} ${props.theme.transition.types.cubic}`};
	}

	&:hover {
		svg {
			opacity: 1;
		}
	}
`

// expects 3 sources, or 1 - ["small", "medium", "large"] or "medium"
const Picture = props => {
	const multipleSources = Array.isArray(props.sources) && props.sources.length == 3

	return (
		<StyledPicture {...props}>
			{multipleSources &&
				props.sources
					.reverse()
					.map((source, index) => (
						<source key={source} srcSet={source} media={`(min-width: ${[0, 680, 1024][2 - index]}px)`} />
					))}
			<img src={multipleSources ? props.sources[1] : props.source} alt={props.alt} />
			<User>
				{({ currentUser }) =>
					currentUser && (
						<>
							{currentUser.permissions.map(permission => permission.name).includes('ADMIN') && (
								<Report image={multipleSources ? props.sources[1] : props.source} />
							)}
						</>
					)
				}
			</User>
		</StyledPicture>
	)
}

export { Picture }

