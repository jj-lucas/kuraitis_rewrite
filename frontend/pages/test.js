import { useContext } from 'react'
import LanguageContext from '../lib/languageContext'
import Test from '../components/Test'

const TestPage = props => {
	const language = useContext(LanguageContext).language
	return (
		<>
			Test 2 {language}
			<Test />
		</>
	)
}

export default TestPage
