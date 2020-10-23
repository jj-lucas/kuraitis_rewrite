import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'
import { LocaleContext } from '../../../lib'
import Details from './Details'
import Gallery from './Gallery'

const PRODUCT_BY_CODE = gql`
	query PRODUCT_BY_CODE($code: String) {
		product(code: $code) {
			id
			code
			name_da
			name_en
			price {
				DKK
				USD
				EUR
				GBP
			}
			description_da
			description_en
			selectedAttributes
			skus {
				id
				sku
				price {
					DKK
					USD
					EUR
					GBP
				}
				image {
					id
				}
			}
			images {
				id
				image
				largeImage
			}
		}
	}
`
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 30px;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		flex-direction: row;
	}
`

const ProductView = ({ code, cart }) => {
	const [SKU, setSKU] = useState('')
	const { locale } = React.useContext(LocaleContext)

	const { loading, error, data } = useQuery(PRODUCT_BY_CODE, {
		variables: { code },
	})

	if (loading) return <p>Loading</p>

	return (
		<Wrapper>
			<Gallery product={data.product} offset={2} SKU={SKU} />
			<Details product={data.product} SKU={SKU} setSKU={setSKU} />
			<Head>
				<title>{data.product[`name_${locale}`]} | Sergio Kuraitis: Naturligt Design</title>
			</Head>
		</Wrapper>
	)
}

export { ProductView }
