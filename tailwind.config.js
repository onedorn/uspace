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
      fontSize: {},
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
    ({ addComponents, theme }) => {
      addComponents({
        '.text-h1': {
          fontFamily: theme('fontFamily.gnuolane'),
          fontWeight: '400',
          fontStyle: 'normal',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: 'normal',
          fontSize: '60px',
          '@screen md': {
            fontSize: '80px',
          },
          '@screen lg': {
            fontSize: '100px',
          },
        },
        '.text-h2': {
          fontFamily: theme('fontFamily.gnuolane'),
          fontWeight: '400',
          fontStyle: 'normal',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: 'normal',
          fontSize: '40px',
          '@screen md': {
            fontSize: '60px',
          },
          '@screen lg': {
            fontSize: '90px',
          },
        },
        '.text-h3': {
          fontFamily: theme('fontFamily.gnuolane'),
          fontWeight: '400',
          fontStyle: 'normal',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: 'normal',
          fontSize: '24px',
          '@screen md': {
            fontSize: '28px',
          },
          '@screen lg': {
            fontSize: '32px',
          },
        },
        '.text-h4': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'normal',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: 'normal',
          fontSize: '24px',
        },
        '.text-p24': {
          fontFamily: theme('fontFamily.gnuolane'),
          fontWeight: '400',
          fontStyle: 'normal',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: 'normal',
          fontSize: '24px',
        },
        '.text-p24-italic': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'italic',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '24px',
          fontSize: '24px',
        },
        '.text-p24-italic-underlined': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'italic',
          textDecorationLine: 'underline',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '24px',
          fontSize: '24px',
        },
        '.text-p18-reg': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'normal',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '24px',
          fontSize: '18px',
        },
        '.text-p18-italic-underlined': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'italic',
          textDecorationLine: 'underline',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '24px',
          fontSize: '18px',
        },
        '.text-p16-regular': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'normal',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '22px',
          fontSize: '16px',
        },
        '.text-p16-italic': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'italic',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '22px',
          fontSize: '16px',
        },
        '.text-p14-reg': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'normal',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '20px',
          fontSize: '14px',
        },
        '.text-p16-italic-underlined': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'italic',
          textDecorationLine: 'underline',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '22px',
          fontSize: '16px',
        },
        '.text-p18-gnuolane': {
          fontFamily: theme('fontFamily.gnuolane'),
          fontWeight: '400',
          fontStyle: 'normal',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: 'normal',
          fontSize: '18px',
        },
        '.text-p18-italic': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'italic',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '24px',
          fontSize: '18px',
        },
        '.text-p14-italic': {
          fontFamily: theme('fontFamily.texgyreheros'),
          fontWeight: '400',
          fontStyle: 'italic',
          textDecorationLine: 'none',
          textTransform: 'none',
          letterSpacing: '0%',
          lineHeight: '22px',
          fontSize: '14px',
        },
      });
    },
  ],
};
