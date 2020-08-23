import ContentSection from '../components/ContentSection'
import About from '../components/About'
import Head from 'next/head'
import { useContext } from 'react'
import LanguageContext from '../lib/languageContext'

const AboutPage = props => {
	const language = useContext(LanguageContext)
	return (
		<ContentSection>
			<Head>
				<title>{language === 'en' ? 'About Sergio' : 'Om Sergio'} | Sergio Kuraitis: Naturligt Design</title>
			</Head>
			<About />
		</ContentSection>
	)
}

export default AboutPage
