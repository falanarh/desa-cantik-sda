const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pdarkblue: "#0B588F",
        pblue: "#26AAE1",
        porange: "#EB891B",
        pgreen: "#68B92E",
        base: "#EEF0F2",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        assistant: ["Assistant", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
