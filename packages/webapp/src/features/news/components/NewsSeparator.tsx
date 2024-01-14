import { Box } from '@chakra-ui/react'
import React from 'react'

export function NewsSeparator() {
  return (
    <Box
      h={10}
      // Card padding + avatar size / 2 - border width / 2
      ml="calc(var(--chakra-sizes-5) + 18px - 1px)"
      borderLeft="6px solid"
      borderColor="white"
      _dark={{ borderColor: 'gray.700' }}
    />
  )
}
