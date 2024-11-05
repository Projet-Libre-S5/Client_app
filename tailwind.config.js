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
        neutral:"#cfb378",
        neutral_sec :"#F5A281"
     },
     fontFamily: {
        Museo:'Museo'
      }
    },
  },
  plugins: [],
}

