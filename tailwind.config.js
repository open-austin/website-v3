/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    require("@tailwindcss/line-clamp"),
  ],
}
