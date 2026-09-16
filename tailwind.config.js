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
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        graphite: "rgb(var(--graphite-rgb) / <alpha-value>)",
        ash: "rgb(var(--ash-rgb) / <alpha-value>)",
        mist: "rgb(var(--mist-rgb) / <alpha-value>)",
        line: "rgb(var(--line-rgb) / <alpha-value>)",
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        snow: "rgb(var(--snow-rgb) / <alpha-value>)",
      },
      letterSpacing: {
        editorial: "0.22em",
      },
    },
  },
  plugins: [],
};
