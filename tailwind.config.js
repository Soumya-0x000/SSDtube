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
        'xl': '1280px', 
        '3xl': '1700px',
      },
    },
  },
  plugins: [],
}
