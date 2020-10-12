const translations = {
	size: {
		en: 'size',
		da: 'mål',
	},
	color: {
		en: 'color',
		da: 'farve',
	},
	tan: {
		en: 'tan',
		da: 'tan',
	},
	brun: {
		en: 'brown',
		da: 'brun',
	},
	sort: {
		en: 'black',
		da: 'sort',
	},
}

export const translate = (str, locale) => {
	if (str.toLowerCase() in translations) {
		return translations[str.toLowerCase()][locale]
	} else {
		return str
	}
}
