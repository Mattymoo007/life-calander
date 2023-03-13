/** @type {import('tailwindcss').Config} */
const colors = require('./constants/colors')

module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: colors,
    },
  },
  safelist: [
    {
      pattern: new RegExp(
        `^(bg|text|border)-(primary|secondary)/(20|30|40|50|60|70|80|90)`
      ),
    },
  ],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
