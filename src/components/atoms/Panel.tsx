import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

// Top = padding (15px) + header height (56px) = 71px

export default function Panel(props: BoxProps) {
  return (
    <Box
      bg="white"
      rounded="md"
      shadow="md"
      position="absolute"
      top="71px"
      left={0}
      width="450px"
      overflowY="auto"
      maxH="calc(100vh - 71px)"
      p={5}
      {...props}
    />
  )
}
