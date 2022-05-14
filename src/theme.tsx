import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const defaultCircleColorHue = 35

export const circleColor = (lightness: string, hue?: number | string) =>
  `hsl(${hue ?? defaultCircleColorHue} ${lightness} ${lightness})`

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
      50: 'hsl(35 97% 5%)',
      100: 'hsl(35 97% 10%)',
      200: 'hsl(35 97% 15%)',
      300: 'hsl(35 97% 25%)',
      400: 'hsl(35 97% 40%)',
      500: 'hsl(35 97% 50%)',
      600: 'hsl(35 97% 75%)',
      700: 'hsl(35 97% 85%)',
      800: 'hsl(35 97% 90%)',
      900: 'hsl(35 97% 95%)',
    },
    gray: {
      50: 'hsl(35 97% 98%)',
      100: 'hsl(35 90% 92%)',
      200: 'hsl(35 80% 86%)',
      300: 'hsl(35 50% 79%)',
      400: 'hsl(35 40% 63%)',
      500: 'hsl(35 12% 50%)', // Readable gray on light and dark background
      550: 'hsl(35 20% 20%)',
      600: 'hsl(35 20% 15%)',
      700: 'hsl(35 20% 11%)',
      800: 'hsl(35 20% 9%)',
      900: 'hsl(35 20% 5%)',
    },
    black: '#111111',
    outline: 'hsl(35 97% 50%)',
  },
  styles: {
    global: (props: any) => ({
      html: {
        fontSize: '16px',
      },
      '*::placeholder': {
        color: 'gray.500',
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.300', 'whiteAlpha.400')(props),
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
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: 'outline',
              boxShadow: `0 0 0 1px var(--chakra-colors-outline)`,
            },
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: 'outline',
              boxShadow: `0 0 0 1px var(--chakra-colors-outline)`,
            },
          },
        },
      },
    },
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
