import { extendTheme, StyleProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/500.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import 'focus-visible/dist/focus-visible'
import './theme.css'

export const defaultCircleColorHue = 200

export const circleColor = (lightness: string, hue?: number | string) =>
  `hsl(${
    hue ?? defaultCircleColorHue
  } calc(${lightness} / 2 + 25%) ${lightness})`

export const bgForBlurLight =
  'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.1))'
export const bgForBlurDark =
  'linear-gradient(135deg, rgba(59, 59, 81, 0.9), rgba(59, 59, 81, 0.1))'

// https://chakra-ui.com/docs/theming/theme
// https://chakra-ui.com/docs/theming/customize-theme
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src

const Input = {
  variants: {
    outline: (props: StyleProps) => ({
      field: {
        bg: mode('whiteAlpha.500', 'blackAlpha.100')(props),
        _focusVisible: {
          borderColor: 'outline',
          boxShadow: `0 0 0 1px var(--chakra-colors-outline)`,
        },
      },
      addon: {
        bg: 'transparent',
      },
    }),
  },
}

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    gray: {
      50: '#FBF7FC',
      100: '#ECECF2',
      200: '#D6D6E1',
      300: '#B2B3C7',
      400: '#8788A9',
      500: '#696C8E', // Readable gray on light and dark background
      550: '#535476',
      600: '#444460',
      700: '#3B3B51',
      800: '#1F1F29',
      900: '#0e0e12',
    },
    black: '#111111',
    outline: 'hsl(35 97% 50%)',
    brand: 'hsla(262, 89%, 68%, 1)',
  },
  styles: {
    global: (props: any) => ({
      html: {
        fontSize: '15px',
      },
      body: {
        bg: mode('gray.50', 'gray.800')(props),
      },
      '*::placeholder': {
        color: 'gray.500',
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.400')(props),
      },
    }),
  },
  fonts: {
    body: 'Nunito, sans-serif',
    heading: 'Montserrat, sans-serif',
    circles: 'Nunito, sans-serif',
  },
  fontWeights: {
    medium: 600,
    semibold: 700,
  },
  shadows: {
    outline: `0 0 0 3px hsl(35 97% 50%)`,
  },
  components: {
    Link: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
    Input,
    NumberInput: Input,
    Select: Input,
    Kbd: {
      baseStyle: {
        fontSize: '1em',
        fontFamily: 'inherit',
        fontWeight: 'normal',
      },
    },
    Modal: {
      baseStyle: {
        header: {
          fontFamily: 'heading',
        },
      },
    },
  },
})

export default theme
