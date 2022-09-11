/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				totifont: ['Bungee', 'cursive'],
			},
		},
		container: {
			center: true,
		},
		minWidth: {
			'1/2': '50%',
		},
		minHeight: {
			'570px': '570px',
		},
	},
	plugins: [],
};
