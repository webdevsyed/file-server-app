/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'dark-teal': 'rgba(6, 150, 151, 0)',
        'dark-teal-2': 'rgba(6, 150, 151, 1)',
        'light-teal': 'rgba(10, 255, 167, 1)',
        'gray-light':'rgba(249, 250, 251, 0.8)',

      },
      fontFamily: {
        'Poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
    plugins: [],
  }
}


// linear-gradient( 180deg, rgba(10, 255, 167, 0) 0%, rgba(10, 255, 167, 0.81) 14.58%, rgba(6, 150, 151, 0.8) 43.23%, #069697 92.71%, rgba(6, 150, 151, 0) 98.44% )

// linear-gradient(-180deg, rgba(6, 150, 151, 0) 25.84%, rgb(6, 150, 151) 99.32%)