import ContentSection from '../components/ContentSection'
import Markets from '../components/Markets'
import Head from 'next/head'
import { useContext } from 'react'
import LanguageContext from '../lib/languageContext'

const MarketsPage = props => {
	const language = useContext(LanguageContext)
	return (
		<ContentSection>
			<Head>
				<title>{language === 'en' ? 'Markets' : 'Markeder'} | Sergio Kuraitis: Naturligt Design</title>
			</Head>
			<Markets />
		</ContentSection>
	)
}

export default MarketsPage
