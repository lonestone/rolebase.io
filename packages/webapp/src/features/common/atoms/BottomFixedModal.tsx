import { Flex, Slide } from '@chakra-ui/react'
import React from 'react'

export interface Props {
  children: React.ReactNode
  isOpen: boolean
  size?: number
}

export default function BottomFixedModal({
  children,
  isOpen,
  size = 340,
}: Props) {
  return (
    <Slide direction="bottom" in={isOpen} style={{ zIndex: 2000 }}>
      <Flex
        justifyContent="center"
        py={6}
        bgGradient="linear(to-b, rgba(0,0,0,0), rgba(0,0,0,0.1))"
        _dark={{
          bgGradient:
            'linear(to-b, rgba(255,255,255,0), rgba(255,255,255,0.2))',
        }}
        pointerEvents="none"
      >
        <Flex
          w={`${size}px`}
          maxW="98%"
          p={5}
          borderRadius="lg"
          borderWidth="1px"
          flexDirection="column"
          pointerEvents="auto"
          bg="menulight"
          _dark={{ bg: 'menudark' }}
        >
          {children}
        </Flex>
      </Flex>
    </Slide>
  )
}
