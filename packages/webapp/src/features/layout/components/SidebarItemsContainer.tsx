import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
  hasItems: boolean
  children: ReactNode
}

export default function SidebarItemsContainer({ hasItems, children }: Props) {
  if (!hasItems) return null
  return (
    <Box pt={2} pb={5}>
      {children}
    </Box>
  )
}
