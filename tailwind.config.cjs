/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eeefff",
          100: "#e0e2ff",
          200: "#c7c9fe",
          300: "#a5a6fc",
          400: "#8981f8",
          500: "#6b56f0",
          600: "#6846e5",
          700: "#5a38ca",
          800: "#4930a3",
          900: "#3e2e81",
        },
      },
    },
  },
  plugins: [],
};
