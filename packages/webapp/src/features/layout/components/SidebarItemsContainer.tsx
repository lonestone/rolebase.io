import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
  hasItems: boolean
  children: ReactNode
}

export default function SidebarItemsContainer({ hasItems, children }: Props) {
  if (!hasItems) return null
  return (
    <Box
      ml={{ base: 0, md: -4 }}
      mr={{ base: -1, md: -2 }}
      mb={2}
      pl={{ base: 0, md: 4 }}
      pr={{ base: 1, md: 2 }}
      pt={2}
      pb={5}
      fontSize="0.94em"
      bg="rgba(0, 0, 0, 0.02)"
      _dark={{ bg: 'rgba(0, 0, 0, 0.1)' }}
    >
      {children}
    </Box>
  )
}
