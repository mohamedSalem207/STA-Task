/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563a8",
        error: "#ef4444",
      },
    },
    screens: {
      sm: "640px",
      md: "992px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1500px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "0.5rem",
        xl: "4rem",
      },
    },
  },
  plugins: [],
};
