/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.js","**/*.html", "/index.html"],
  theme: {
    extend: {
      // tambah text 
      fontSize: {
        'xxs': '.5rem',
       },
    },
  },
  plugins: [],
}

