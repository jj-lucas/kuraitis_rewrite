const theme = {
	colors: {
		lightGray: '#f8f8f8',
		gray: '#1a1a1a99',
		darkGray: '#1a1a1a',
		black: '#393939',
		blue: '#0394fc',
	},
	maxWidth: '1024px',
	maxLengthLine: '1024px',
	bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
	breakpoints: {
		xs: '375px',
		sm: '680px',
		md: '1024px',
		lg: '1260px',
		xl: '1600px',
	},
	spacing: {
		base: '20px',
		xs: '5px', // /4
		sm: '10px', // /2
		lg: '40px', // *2
		xl: '60px', // *3
		xxl: '100px', // *5
	},
	typography: {
		fs: {
			h1: '36px',
			h2: '24px',
			h3: '16px',
			h4: '16px',

			lg: '20px',
			base: '14px',
			sm: '12px',
			xs: '10px',
		},
		fw: {
			light: 300,
			regular: 400,
			semibold: 600,
			bold: 700,
		},
		ff: {
			oswald: "'Oswald', sans-serif",
			droid: 'droid_sansregular',
		},
	},
}

export default theme
