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
        gold: {
          light: "#fbbf24", // Light gold
          DEFAULT: "#f59e0b", // Gold
          dark: "#d97706", // Dark gold
        },
      },
      animation: {
        shine: "shine 1.5s ease-in-out infinite",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "50%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
};
