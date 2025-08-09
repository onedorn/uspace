module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './src/styles/*.css'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1440px',
      },
      fontFamily: {
        gnuolane: ['Gnuolane Free Cyrillic', 'sans-serif'],
        texgyreheros: ['TeX Gyre Heros', 'sans-serif'],
      },
      colors: {},
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
