/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'csm': '630px',  
        'clg': '1180px', 
        '3xl': '1700px',
        'plstScMd': '700',
        'plstScLg': '970',
        'plstScXl': '1187',
        'plstSc2Xl': '1400',
      },
    },
  },
  plugins: [],
}
