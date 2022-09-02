/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily:{
      'SG':['"Space Grotesk"', 'sans-serif'],
      'Inter':['Inter', 'sans-serif']
    },
    screens: {
      'mobile': '300px',

      'tablet': '640px',

      'laptop': '1200px',


      'desktop': '1400px',

    },
    extend: {
      scale: {
        '80': '0.8'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("daisyui"),
  ],
}
