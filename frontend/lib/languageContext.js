import React from 'react'
const LanguageContext = React.createContext({
	setLanguage: () => {},
})
export const LanguageProvider = LanguageContext.Provider
export default LanguageContext
