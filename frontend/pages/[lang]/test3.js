import React from 'react'
import Artist from '../../components/TestLocale'
import withLocale from '../../lib/localeHelper'

const IndexPage = () => {
	return <Artist />
}

const WithLocale = withLocale(IndexPage)

export default WithLocale
