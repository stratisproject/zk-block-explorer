const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,ts,vue}"],
  theme: {
    container: false,
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: {
          50: "#fbf3ff",
          100: "#ecd9f9",
          200: "#f0cbff",
          300: "#c865da",
          400: "#885db9",
          500: "#914e9d",
          600: "#7b4e9a",
          700: "#49325d",
          800: "#53247b",
          900: "#0f172a",
        },
        secondary: colors.yellow,
        neutral: colors.gray,

        success: colors.green,
        error: colors.red,
        warning: colors.yellow,
      },
      screens: {
        xs: "480px",
        "4xl": "1920px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          "@screen xl": {
            maxWidth: "1240px",
          },
        },
      });
    },
  ],
};
