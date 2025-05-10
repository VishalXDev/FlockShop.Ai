/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E8B57", // rich green
        secondary: "#F0F4F8",
        accent: "#F97316", // orange
        background: "#ffffff",
        dark: "#1f2937",
      },
    },
  },
};
