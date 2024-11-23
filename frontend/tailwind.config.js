/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:{
          DEFAULT:'#FDE5C3',
          light: '#F9F3E6',
          medium: '#FAF8F3',
          dark: '#fff5e6'
        },
        pink: {
          DEFAULT: '#710117',
          light: '#8c021e',
          dark: '#7A1625',
        },
        grey: {
          DEFAULT: '#FAF8F3',
          light: '#ecd5bb',
          dark: '#C4A484',
          darker: '#7C7367',
        },
        violet: {
          DEFAULT: ' #5B2333',
          dark: '#8B3A4F',
        },
        red : '#D32F2F',
      }
    },
  },
  plugins: [],
}

