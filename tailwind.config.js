/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'hse-orange': '#FF6B35',
        'hse-blue': '#004E89',
        'hse-yellow': '#FFC845',
        'hse-green': '#52B788',
      },
    },
  },
  plugins: [],
}
