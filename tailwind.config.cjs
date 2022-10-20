/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['"Baloo 2Variable"', 'sans-serif'],
				'serif': ['"Baloo 2Variable"', 'serif']
			}
		}
	},
	plugins: []
};
