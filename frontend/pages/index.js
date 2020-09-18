import React from 'react'
import Head from 'next/head'
import { getInitialLocale } from '../lib'

const Index = () => {
	React.useEffect(() => {
		window.location.replace(`/${getInitialLocale()}`)
	})
	return (
		<Head>
			<meta name="robots" content="noindex, nofollow" />
		</Head>
	)
}

export default Index
