/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			SG: ['"Space Grotesk"', 'sans-serif'],
			Inter: ['Inter', 'sans-serif'],
		},
		screens: {
			mobile: '300px',

			tablet: '640px',

			'sm-laptop': '1024px',

			laptop: '1200px',

			desktop: '1400px',

			'lg-desktop': '2000px',
		},
		extend: {
			backgroundImage: theme => ({
				'hero': "url('/public/landingBackgroundDrop.png')",
				'heroo': "url('../public/landingBackgroundDrop.png')",
			  }),

			scale: {
				80: '0.8',
			},
			colors: {
				'bright-green': '#ACFF00',
				'dark-green': '#0C1615',
				'light-grey': '#EFF1F3',
				'off-white': '#EFF3F0',
				grey: '#656E6F',
				'off-grey': '#748282',
			},
			keyframes: {
				flyOut: {
					'0%': { transform: 'translateX(0%);' },
					'100%': { transform: 'translateX(100%);' },
				},
				flyIn: {
					'0%': { transform: 'translateX(100%);' },
					'100%': { transform: 'translateX(0%);' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeOut: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
			},
			animation: {
				fadeIn: 'fadeIn 400ms ease-in-out',
				flyIn: 'flyIn 400ms ease-out',
				flyOut: 'flyOut 1s ease-out',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
};
