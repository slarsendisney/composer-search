module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#faf7fd",
          100: "#f5effb",
          200: "#e6d8f5",
          300: "#d7c1ef",
          400: "#b892e2",
          500: "#9a63d6",
          600: "#8b59c1",
          700: "#744aa1",
          800: "#5c3b80",
          900: "#4b3169",
        },
        secondary: {
          50: "#f2fcf9",
          100: "#e6f9f3",
          200: "#bff1e2",
          300: "#99e9d1",
          400: "#4dd8ae",
          500: "#00c78b",
          600: "#00b37d",
          700: "#009568",
          800: "#007753",
          900: "#006244",
        },
      },
      scale: {
        200: "2",
        400: "4",
        600: "6",
      },
      screens: {
        xxl: { min: "1600px" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
