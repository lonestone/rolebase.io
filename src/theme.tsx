import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
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
