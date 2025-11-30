/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F7B075',
          orange: '#E95A59',
          purple: '#B31872',
        },
      },
      fontFamily: {
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['NT Somic', 'sans-serif'],
      },
      fontSize: {
        h1: '72px',
        h2: '60px',
        h3: '48px',
        h4: '36px',
        t1: '24px',
        t2: '18px',
        t3: '14px',
        t4: '12px',
      },
      backgroundImage: {
        'gradient-brand-30': 'linear-gradient(30deg, #F7B075, #E95A59, #B31872)',
        'gradient-brand-45': 'linear-gradient(45deg, #F7B075, #E95A59, #B31872)',
        'gradient-brand-60': 'linear-gradient(60deg, #F7B075, #E95A59, #B31872)',
        'gradient-45': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    },
  ],
}
