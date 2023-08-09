import { Box } from '@chakra-ui/react'
import { CircleMemberProvider } from '@contexts/CircleMemberProvider'
import { SidebarContext } from '@contexts/SidebarContext'
import useWindowSize from '@hooks/useWindowSize'
import Sidebar from '@organisms/layout/Sidebar'
import React, { useContext } from 'react'

interface Props {
  children: React.ReactNode
}

export default function LoggedLayout({ children }: Props) {
  const windowSize = useWindowSize()
  const sidebarContext = useContext(SidebarContext)

  return (
    <CircleMemberProvider>
      <Sidebar />
      <Box
        position="relative"
        h={0}
        minH={`${windowSize.height - (sidebarContext?.height || 0)}px`}
        ml={sidebarContext?.width ? `${sidebarContext?.width}px` : 0}
        mt={sidebarContext?.height ? `${sidebarContext?.height}px` : 0}
      >
        {children}
      </Box>
    </CircleMemberProvider>
  )
}
