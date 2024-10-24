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
        secondary:"#f1f5f9",
        neutral:"#008DB9",
        neutral_sec :"#F07158"
     },
     fontFamily: {
        Museo:'Museo'
      }
    },
  },
  plugins: [],
}

