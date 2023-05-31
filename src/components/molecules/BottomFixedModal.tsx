import GlassBox from '@atoms/GlassBox'
import { Box } from '@chakra-ui/react'
import React from 'react'

export type Props = {
  children: React.ReactNode
}

export const BottomFixedModal = ({ children }: Props) => {
  return (
    <>
      <Box
        position="fixed"
        zIndex="2000"
        h="200px"
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, rgba(255,255,255,0), rgba(255,255,255,0.9))"
        _dark={{
          bgGradient: 'linear(to-b, rgba(0,0,0,0), rgba(0,0,0,0.9))',
        }}
        pointerEvents="none"
      />

      <GlassBox
        position="fixed"
        zIndex="2000"
        w="340px"
        ml="-170px"
        left="50%"
        bottom={2}
        p={5}
        borderRadius="lg"
        borderWidth="1px"
        display="flex"
        flexDirection="column"
      >
        {children}
      </GlassBox>
    </>
  )
}
