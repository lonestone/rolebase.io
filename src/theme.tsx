import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        textDecoration: 'underline',
      },
    },
  },
})

export default theme
