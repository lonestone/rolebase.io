import { useColorMode } from '@chakra-ui/react'
import { Appearance } from '@stripe/stripe-js'
import { useMemo } from 'react'

export const useStripeAppearance = () => {
  const { colorMode } = useColorMode()

  const stripeAppearance: Appearance = useMemo(() => {
    const isDark = colorMode === 'dark'

    return {
      theme: isDark ? 'night' : 'stripe',
      variables: {
        colorText: isDark ? 'white' : 'dark',
        colorPrimary: '#DD6B20',
        borderRadius: '5px',
        focusOutline: '1px solid #ED8936',
      },
      rules: {
        '.Input': {
          boxShadow: 'none',
        },
      },
    }
  }, [colorMode])

  return stripeAppearance
}
