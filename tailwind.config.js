/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#ff3b8a",       // розовый акцент
          primaryDark: "#e33279",
          bg: "#ffffff",
          muted: "#f8fafc",
          dark: "#111827",
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(15,23,42,0.08)",
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
