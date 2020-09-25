import React from 'react'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import { LocaleContext } from '../../lib'
import { Picture } from '../../components'

const CATEGORY_QUERY = gql`
	query CATEGORY_QUERY {
		categories {
			id
			published
			slug_da
			slug_en
			name_da
			name_en
			sorting
			images {
				image
			}
		}
	}
`

const ItemsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 30px;
`

const CategoryOverview = props => {
	const { locale } = React.useContext(LocaleContext)
	const { loading, error, data } = useQuery(CATEGORY_QUERY)

	if (loading) return <p>Loading..</p>

	return <>{props.slug}</>
}

export { CategoryOverview }
