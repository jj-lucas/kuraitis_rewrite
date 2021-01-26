import { MdRadioButtonChecked, MdShoppingCart } from 'react-icons/md'
import React from 'react'
import styled from 'styled-components'
import { LanguageSelector } from '../../components'
import { CartContext, CurrencyContext, LocaleContext, translate } from '../../lib'

const CurrencySelector = styled.select``

const StyledToolbox = styled.div`
	margin-top: 2rem;
	float: right;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		margin-top: 3rem;
	}

	.primary {
		display: flex;
		flex-direction: column;

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			display: block;
		}
	}

	.secondary {
		display: none;
		margin: 0;

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			display: block;
		}
	}

	.cart-icon {
		position: relative;
	}

	${CurrencySelector} {
		margin: 1rem 1rem;
	}
`

const CartItemsIcon = styled(MdRadioButtonChecked)`
	position: absolute;
	top: -11px;
	left: 17px;
	color: var(--blue);
	pointer-events: none;
`

const Toolbox = () => {
	const { locale } = React.useContext(LocaleContext)
	const { cart, setCartOpen } = React.useContext(CartContext)
	const { currency, setCurrency } = React.useContext(CurrencyContext)

	const onChangeCurrency = e => {
		setCurrency(e.target.value)
		localStorage.setItem('currency', e.target.value)
	}

	return (
		<StyledToolbox>
			<div className="primary">
				<span>
					<span className="cart-icon">
						<MdShoppingCart
							size={25}
							style={{
								marginRight: 10,
								cursor: 'pointer',
							}}
							onClick={e => {
								e.preventDefault()
								setCartOpen(true)
							}}
						/>
						{cart && cart.items && <CartItemsIcon />}
					</span>
				</span>
				{locale && <LanguageSelector />}
			</div>
			<p className="secondary">
				{translate('currency', locale)}:
				<CurrencySelector onChange={onChangeCurrency} value={currency}>
					<option value="DKK">DKK</option>
					<option value="USD">$ USD</option>
					<option value="EUR">€ EUR</option>
					<option value="GBP">£ GBP</option>
				</CurrencySelector>
			</p>
		</StyledToolbox>
	)
}

export { Toolbox }
