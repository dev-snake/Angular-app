/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-layout": "repeat(auto-fit, minmax(200px, 1fr))",
        "layout-home": "repeat(auto-fit, minmax(245px, 1fr))",
        "cols2-1": "2fr 1fr",
        "cols1-2": "200px 2fr",
      },
      fontFamily: {
        "quick-sand": ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
