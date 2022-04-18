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
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#6D708E',
      550: '#292B31',
      600: '#242226',
      700: '#1B1A1D',
      800: '#141316',
      900: '#121214',
    },
    black: '#37352f',
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
