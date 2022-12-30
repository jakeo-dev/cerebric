/** @type {import('tailwindcss').Config} */
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */

module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'Righteous': ['Righteous', 'sans-serif'],
      'Alata': ['Alata', 'sans-serif']
    },
    extend: {
      colors: {
        'lightRed': '#db4646'
      }
    }
  },
  plugins: [],
}