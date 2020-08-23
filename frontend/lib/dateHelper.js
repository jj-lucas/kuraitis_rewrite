const datesToRange = (d1, d2, lang) => {
	const re = /(\d*)\/(\d*)\/(\d*)/
	const date1 = new Date(d1.replace(re, '$3/$2/$1'))
	const date2 = new Date(d2.replace(re, '$3/$2/$1'))
	if (d1 === d2) {
		// 25 Marts 2020
		return `${date1.getDate()} ${getLocalizedMonth(lang, date1.getMonth())} ${date1.getFullYear()}`
	}
	if (date1.getMonth() === date2.getMonth() && date1.getYear() === date2.getYear()) {
		// 25-26 Marts 2020
		return `${date1.getDate()}-${date2.getDate()} ${getLocalizedMonth(lang, date1.getMonth())} ${date1.getFullYear()}`
	} else if (date1.getYear() === date2.getYear()) {
		// 25 Marts - 26 April 2020
		return `${date1.getDate()} ${getLocalizedMonth(lang, date1.getMonth())} - ${date2.getDate()} ${getLocalizedMonth(
			lang,
			date2.getMonth()
		)} ${date1.getFullYear()}`
	} else {
		// 25 Marts 2020 - 26 April 2021
		return `${date1.getDate()} ${getLocalizedMonth(
			lang,
			date1.getMonth()
		)} ${date1.getFullYear()} - ${date2.getDate()} ${getLocalizedMonth(lang, date2.getMonth())} ${date2.getFullYear()}`
	}
}

const months = {
	da: [
		'Januar',
		'Februar',
		'Marts',
		'April',
		'Maj',
		'Juni',
		'Juli',
		'August',
		'September',
		'Oktober',
		'November',
		'December',
	],
	en: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	],
}
const getLocalizedMonth = (lang, month) => {
	return months[lang][parseInt(month, 10)]
}

export { datesToRange }
