/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.css",
    "./**/*.{html,js, jsx}",
    "./src/**/*.{html,js, jsx}",
    './src/**/*.css',
    "./components/**/*.{js,jsx }",
    "./containers/**/*.{js,jsx }",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
