import { extendTheme } from '@chakra-ui/react'

export const mainColor = (lightness: string) => `hsl(252deg 52% ${lightness})`

// https://chakra-ui.com/docs/theming/theme
// https://chakra-ui.com/docs/theming/customize-theme
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
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
    gray: {
      50: '#fbfaf7',
      100: '#f2f1ee',
      200: '#f3efe2',
      300: '#e8e0cf',
      400: '#a6a29b',
      500: '#7d7b78',
      550: '#3c3b3b',
      600: '#302f2f',
      700: '#222121',
      800: '#1e1d1d',
      900: '#141414',
    },
    black: '#111111',
  },
  components: {
    Link: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
  },
})

export default theme
