/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#0a0a0a",
        graphite: "#1a1a1a",
        ash: "#6b6b6b",
        mist: "#a3a3a3",
        line: "#e5e5e5",
        paper: "#fafafa",
      },
    },
  },
  plugins: [],
}
