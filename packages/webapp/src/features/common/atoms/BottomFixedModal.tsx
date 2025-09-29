import { SidebarContext } from '@/layout/contexts/SidebarContext'
import { Flex, Slide, StyleProps } from '@chakra-ui/react'
import React, { useContext } from 'react'

export interface Props extends StyleProps {
  children: React.ReactNode
  isOpen: boolean
  width?: number
}

export default function BottomFixedModal({
  children,
  isOpen,
  width = 340,
  ...props
}: Props) {
  const sidebarContext = useContext(SidebarContext)
  const left = sidebarContext?.width || 0

  return (
    <Slide
      direction="bottom"
      in={isOpen}
      style={{ zIndex: 2000, pointerEvents: 'none' }}
    >
      <Flex justifyContent="center" py={6} pl={left}>
        <Flex
          w={`${width}px`}
          maxW="98%"
          p={5}
          borderRadius="lg"
          borderWidth="1px"
          boxShadow="lg"
          flexDirection="column"
          pointerEvents="auto"
          bg="menulight"
          _dark={{ bg: 'menudark' }}
          {...props}
        >
          {children}
        </Flex>
      </Flex>
    </Slide>
  )
}
