/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,tsx}", './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors:{
        'btn-primary': '#00AEA9',
        'btn-primary-hover': '#079995',
        'typogra': '#0B2A4A',
        'bg-primary': '#D9D9D9',
        'check-color': '#0B2A4A',
        'point-color': '#00AEA9',
        'body-table' : '#0B2A4A'
      }
    },
  },
  plugins: [],
}
