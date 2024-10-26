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
        neutral:"#817A6E",
        neutral_sec :"#F07158"
     },
     fontFamily: {
        Museo:'Museo'
      }
    },
  },
  plugins: [],
}

