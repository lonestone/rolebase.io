import { Box, BoxProps, forwardRef } from '@chakra-ui/react'
import { bgForBlurDark, bgForBlurLight } from 'src/theme'

export default forwardRef(function GlassBox(props: BoxProps, ref) {
  return (
    <Box
      ref={ref}
      bg={bgForBlurLight}
      backdropFilter="auto"
      backdropBlur="xl"
      borderColor="gray.200"
      _dark={{
        bg: bgForBlurDark,
        borderColor: 'gray.550',
      }}
      {...props}
    />
  )
})
