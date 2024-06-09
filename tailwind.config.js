/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    'node_modules/preline/dist/*.js',
    './nuxt.config.{js,ts}',
    './app.vue',
    './node_modules/flowbite/**/*.{js,ts}',
    './tailwind-theme.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Montserrat', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif']
      },
      colors: {
        primary: '#F5D21B',
        'light-blue': '#007BFF',
        'custom-blue': '#00396B',
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16',
          'custom-green': '#00CF95'
        },
        red: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#c53030',
          800: '#991b1b',
          900: '#7b341e',
          'freaky-element': '#ff5c00'
        }
      }
    }
  },
  plugins: [require('flowbite/plugin')]
};
