/** @type {import('tailwindcss').Config} */
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors : {
        primary : "#7894CF",
        secondary:"#f1f5f9",
        neutral:"#d5a776",
        neutral_sec :"#e4f3ff"
     },
     fontFamily: {
        Museo:'Museo'
      }
    },
  },
  plugins: [],
}

