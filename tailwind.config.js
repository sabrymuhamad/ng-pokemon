/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: 'pk-',
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          initial: 'initial',
          inherit: 'inherit',
          current: 'currentColor',
          transparent: 'transparent',
          ofWhite: '#FDFDFD',
          black: 'var(--black-color)',
          muted: '#8B8B8B',
          borderColor: '#E4E4E4',
          primary: {
            100: '#D7F5E1',
            200: '#A8EBC3',
            300: '#79E2A5',
            400: '#4AD987',
            500: 'var(--primary-color)',
            600: '#039743',
            700: '#027837',
            800: '#01592B',
            900: '#003B1F'
          }
        }
      },
    },
    plugins: [],
  }