import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'
import { bgForBlurDark, bgForBlurLight } from 'src/theme'

export default function GlassBox(props: BoxProps) {
  return (
    <Box
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
}
