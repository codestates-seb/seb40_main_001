/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    extend: {},
  },
  /* eslint-disable global-require */
  plugins: [require('daisyui')],
};
