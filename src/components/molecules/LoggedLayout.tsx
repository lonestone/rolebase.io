import { Box } from '@chakra-ui/react'
import { CircleMemberProvider } from '@contexts/CircleMemberContext'
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
        h={0}
        minH={`${windowSize.height}px`}
        pl={sidebarContext?.width ? `${sidebarContext?.width}px` : 0}
        pt={sidebarContext?.height ? `${sidebarContext?.height}px` : 0}
      >
        {children}
      </Box>
    </CircleMemberProvider>
  )
}
