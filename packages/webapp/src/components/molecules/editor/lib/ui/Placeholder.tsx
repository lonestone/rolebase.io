import { Box } from '@chakra-ui/react'

import React, { ReactNode } from 'react'

export default function Placeholder({ children }: { children: ReactNode }) {
  return (
    <Box
      color="gray.400"
      overflow="hidden"
      position="absolute"
      textOverflow="ellipsis"
      top={2}
      left={4}
      m="1px"
      user-select="none"
      white-space="nowrap"
      display="inline-block"
      pointerEvents="none"
      _dark={{
        color: 'gray.500',
      }}
    >
      {children}
    </Box>
  )
}
