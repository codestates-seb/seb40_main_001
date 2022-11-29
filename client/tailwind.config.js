/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    fontSize: {
      100: '10px',
      200: '13px',
      300: '16px',
      400: '19px',
      500: '21px',
      600: '24px',
    },
    textColor: {
      DEFAULT: '#000000',
      low: '#8D8D8D',
      light: '#BBBBBB',
      err: '#FF0000',
      exercise: '#7FD1AE',
      white: '#FFFFFF',
      red: '#FF7B8E',
    },
    colors: {
      main: {
        DEFAULT: '#2BAE66',
        week: '#7FD1AE',
        red: '#FF7B8E',
      },
      text: {
        disabled: '#BBBBBB',
        DEFAULT: '#2D2D2D',
        sub: '#8D8D8D',
      },
      gray: '#F8F8F8',
      blue: '#466BED',
      yellow: '#FFE500',
      red: '#FF2E00',
      orange: '#FF8A00',
      border_color: '#F2F2F2',
      green: '#7ACE82',
      babyPink: '#FCF6F5',
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      dropShadow: {
        DEFAULT: '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  daisyui: {
    themes: false,
  },
  /* eslint-disable global-require */
  plugins: [require('daisyui')],
};
