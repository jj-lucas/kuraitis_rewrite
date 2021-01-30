import React, { useContext } from 'react'
import { FiTruck as DeliveryIcon } from 'react-icons/fi'
import { ImGift as GiftIcon } from 'react-icons/im'
import { MdCached as ReturnIcon, MdPinDrop as TrackIcon } from 'react-icons/md'
import styled from 'styled-components'
import { LocaleContext, translate } from '../../lib'

const StyledSellingPoints = styled.div`
	margin: 6rem 0 3rem;
	display: grid;
	grid-template-columns: 1fr;
	text-align: center;

	> div {
		border-top: 1px solid var(--lightishGray);
		padding-top: 2rem;
	}

	p {
		margin-top: 0;
	}

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 2rem;

		> div {
			border: 0 none;
		}
	}
`

const SellingPoints = () => {
	const { locale } = useContext(LocaleContext)

	return (
		<StyledSellingPoints>
			<div>
				<div>
					<DeliveryIcon size={25} />
				</div>
				{locale === 'en' ? (
					<p>
						3-5 days until your order is made and shipped. <br />
						Actual delivery time is not included. See the FAQ for more info.
					</p>
				) : (
					<p>__selling_points_delivery</p>
				)}
			</div>
			<div>
				<div>
					<GiftIcon size={25} />
				</div>
				{locale === 'en' ? <p>All items are shipped in gift packaging.</p> : <p>__selling_points_gift_wrapping</p>}
			</div>
			<div>
				<div>
					<ReturnIcon size={25} />
				</div>
				{locale === 'en' ? (
					<p>
						Free cancellations prior to shipping. <br />
						30 days return right for non-customized products.
					</p>
				) : (
					<p>__selling_points_cancellations_returns</p>
				)}
			</div>
		</StyledSellingPoints>
	)
}

export { SellingPoints }
