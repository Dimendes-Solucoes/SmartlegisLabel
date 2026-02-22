/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#003d6f',
        'brand-blue-dark': '#002847',
        'brand-dark-blue-legis': '#023866',
        'accent-blue': '#007AB8',
      },
    },
  },
  plugins: [],
}
