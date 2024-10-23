/** @type {import('tailwindcss').Config} */
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors : {
        primary : "#F6F7FB",
        secondary:"#FBFCFF",
        neutral:"#48B0BA",
        neutral_sec :"#F07158"
     },
     fontFamily: {
        Museo:'Museo'
      }
    },
  },
  plugins: [],
}

