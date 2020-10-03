const theme = {
	colors: {
		lightGray: '#f8f8f8',
		gray: '#1a1a1a99',
		darkGray: '#1a1a1a',
		black: '#393939',
		blue: '#0394fc',
		negative: '#ff421e',
		positive: '#7ede28',
		info: '#fbd01e',
		warning: '#ffad1e',
	},
	maxWidth: '1400px',
	maxLengthLine: '1024px',
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
	sizes: {
		icons: {
			sm: '14px',
			md: '20px',
			lg: '36px',
			fill: 'auto',
		},
		productPage: {
			thumbs: '100px',
		},
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
	boxShadow: {
		sm: '0 0 5px 3px rgba(0, 0, 0, 0.05)',
		md: '0 0 8px 0 rgba(0, 0, 0, 0.2);',
		lg: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
	},
	transition: {
		durations: {
			short: '0.2s',
			long: '0.8s',
		},
		types: {
			cubic: 'cubic-bezier(0.73, 0.09, 0.21, 0.96)',
			easeInOut: 'ease-in-out',
		},
	},
}

export { theme }
