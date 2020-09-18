import React from 'react'
import { Artist } from '../../components'
import { withLocale } from '../../lib'

const IndexPage = () => {
	return <Artist />
}

const WithLocale = withLocale(IndexPage)

export default WithLocale
