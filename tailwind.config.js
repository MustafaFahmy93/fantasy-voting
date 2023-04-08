
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif', 'EB Garamond', 'Cantarell'],
      body: ['Open Sans', 'sans-serif', 'EB Garamond', 'Ubuntu', 'Cantarell'],
      app: ['Kenia'],
      logo: ['Indie Flower'],
    },
    screens: {
      xs: '375px',
      sm: '425px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        brightRed: 'hsl(12, 88%, 59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
        newColor: "rgb(210,37,0)",
      },
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        // 'main-bg': '#FAFBFB',
        // 'main-dark-bg': '#20232A',
        // 'secondary-dark-bg': '#33373E',
        // 'light-gray': '#F7F7F7',
        // 'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        // 'hero-pattern':
        //   "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
        'board':
          "url('//src/assets/img/board.png')",
        "tcolor-black": "url('//src/assets/img/black.png')",

      },
      spacing: {
        '112': '28rem',
        '128': '32rem',
        '136': '37rem',
      },
      zIndex: {
        '100000': '100000',
      }
    },
  },
  plugins: [],
});
