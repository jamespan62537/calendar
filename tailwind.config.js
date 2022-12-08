/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      width: {
        "14.2%": "14.2%",
        "400px": "400px",
      },
      height: {
        "53px": "53px",
        "93px": "93px",
      },
      colors: {
        gray: {
          100: "#eeeeee",
        },
        red: {
          600: "#db3d44",
        },
      },
    },
  },
  plugins: [],
};
