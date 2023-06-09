/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@arkejs/{ui,table}/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@arkejs/ui/plugin")],
  arkeUI: {
    theme: {
      colors: {
        background: {
          300: "#18191E",
          DEFAULT: "#0B0B13",
        },
      },
    },
  },
};
