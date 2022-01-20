import { extendTheme } from '@chakra-ui/react'

export const mainColor = (lightness: string) => `hsl(192deg 75% ${lightness})`

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: mainColor('5%'),
      100: mainColor('10%'),
      200: mainColor('15%'),
      300: mainColor('25%'),
      400: mainColor('40%'),
      500: mainColor('50%'),
      600: mainColor('75%'),
      700: mainColor('85%'),
      800: mainColor('90%'),
      900: mainColor('95%'),
    },
    black: '#37352f',
  },
  shadows: {
    outline: '0 0 3px 0px rgb(0 0 0)',
  },
  components: {
    Link: {
      baseStyle: {
        textDecoration: 'underline',
      },
    },
  },
})

export default theme
