module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './src/styles/*.css'],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1440px',
      },
      fontFamily: {
        gnuolane: ['Gnuolane Free Cyrillic', 'sans-serif'],
        texgyreheros: ['TeX Gyre Heros', 'sans-serif'],
      },
      fontSize: {
        // Headings
        'heading-1': [
          'clamp(36px, 7.5vw, 72px)',
          {
            lineHeight: 'clamp(40px, 8vw, 80px)',
          },
        ],
        'heading-2': [
          'clamp(32px, 6.5vw, 64px)',
          {
            lineHeight: 'clamp(36px, 7vw, 72px)',
          },
        ],
        'heading-3': [
          'clamp(28px, 5.5vw, 48px)',
          {
            lineHeight: 'clamp(32px, 6vw, 54px)',
          },
        ],
        'heading-4': [
          'clamp(20px, 4.5vw, 32px)',
          {
            lineHeight: 'clamp(24px, 5vw, 38px)',
          },
        ],

        // Paragraphs (зроблені помітно адаптивними)
        'p-large': [
          'clamp(18px, 4vw, 26px)',
          {
            lineHeight: 'clamp(22px, 4.5vw, 32px)',
          },
        ],
        'p-medium': [
          'clamp(16px, 3.5vw, 22px)',
          {
            lineHeight: 'clamp(20px, 4vw, 28px)',
          },
        ],
        'p-small': [
          'clamp(14px, 3vw, 18px)',
          {
            lineHeight: 'clamp(18px, 3.5vw, 24px)',
          },
        ],
        'p-xsmall': [
          'clamp(12px, 2.5vw, 16px)',
          {
            lineHeight: 'clamp(16px, 3vw, 20px)',
          },
        ],
      },
      colors: {
        beige: {
          100: '#FFFFF7', // Lighter
          300: '#FFFFF0',
          500: '#FEFFEA', // Your original beige
          700: '#F5F5D5',
          900: '#ECECC0', // Darker
        },
        black: {
          100: '#4D4D4D', // Lighter
          300: '#333333',
          500: '#111111', // Your original black
          700: '#0A0A0A',
          900: '#040404', // Darker
        },
        orange: {
          100: '#FFE4B3', // Lighter
          300: '#FFCA66',
          500: '#FF9100', // Your original orange
          700: '#CC7400',
          900: '#995700', // Darker
        },
        blue: {
          100: '#999BFF', // Lighter
          300: '#4D50F5',
          500: '#0D10C2', // Your original blue
          700: '#0A0D99',
          900: '#070A70', // Darker
        },
        'hover-orange': {
          100: '#FFDFB3', // Lighter
          300: '#F5B866',
          500: '#F58700', // Your original hover-orange
          700: '#C46B00',
          900: '#934F00', // Darker
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
