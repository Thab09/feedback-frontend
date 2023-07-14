/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
    colors: {
      primary: {
        100: "#F6F8FC",
        200: "#97ACCF",
        300: "#6D93FF",
        400: "#4B79FF",
        500: "#3166FF",
      },
      white: {
        100: "#FFFFFF",
        200: "#F5F5F7", // button
        300: "#EDEDED",
      },
      black: {
        100: "#ACACAC",
        200: "#EDEDED",
        300: "#8C8C8C", // sub headers
        400: "#5A5A5A",
        500: "#393A3A",
        600: "#1A1E1F",
        700: "#161617", // big headers
        800: "#070E0E",
        900: "#000000",
      },
    },
  },
  plugins: [],
};
