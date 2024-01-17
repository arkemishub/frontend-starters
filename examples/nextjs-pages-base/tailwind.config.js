/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@arkejs/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@arkejs/ui/plugin")],
  arkeUI: {
    theme: {
      colors: {
        background: {
          DEFAULT: "#0B0B13",
        },
      },
    },
  },
};
