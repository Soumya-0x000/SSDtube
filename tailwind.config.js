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
        'cmd': '1100px',  
        'clg': '1280px', 
        'c2xl': '1570px',
        '3xl': '1700px',
        // 'xsm': '550px',
        // 'plstScMd': '700',
        // 'plstScLg': '970',
        // 'plstScXl': '1187',
        // 'plstSc2Xl': '1400',
        'watchController': '1120',
      },
    },
  },
  plugins: [],
}
