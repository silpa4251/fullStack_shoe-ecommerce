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
          pale: '#ECD5BB',
          light: '#F9F3E6',
          medium: '#FAF8F3',
          dark: '#fff5e6'
        },
        pink: {
          DEFAULT: '#710117',
          light: '#8c021e',
          medium: '#b94343',
          dark: '#7A1625',
          darker: '#570213',
        },
        grey: {
          DEFAULT: '#FAF8F3',
          light: '#ecd5bb',
          medium: '#e0e0e0',
          dark: '#C4A484',
          darker: '#7C7367',
        },
        violet: {
          DEFAULT: '#5B2333',
          pale: '#c0ad98',
          dark: '#8B3A4F',
        },
        wine: {
          DEFAULT: '#5B2333',
          light: '#8B3A4F',
        },
        error : '#D32F2F',
      }
    },
  },
  plugins: [],
}

