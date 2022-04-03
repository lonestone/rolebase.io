import { Box, Flex, Heading, Tag, useColorMode } from '@chakra-ui/react'
import React from 'react'

interface Props {
  index: number
  title: string
  current: boolean
  last: boolean
  onNumberClick?(): void
  children: React.ReactNode
}

export default function MeetingStepLayout({
  index,
  title,
  current,
  last,
  onNumberClick,
  children,
}: Props) {
  const { colorMode } = useColorMode()
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.550'

  return (
    <>
      <Flex alignItems="center">
        <Tag
          color={
            current ? 'white' : colorMode === 'light' ? 'black' : 'gray.300'
          }
          bg={current ? 'green.600' : borderColor}
          variant="solid"
          size="lg"
          fontWeight="bold"
          borderRadius="full"
          mr={5}
          cursor={onNumberClick ? 'pointer' : 'default'}
          onClick={onNumberClick}
        >
          {index + 1}
        </Tag>
        <Heading as="h2" size="sm">
          {title}
        </Heading>
      </Flex>
      <Box
        borderLeft="2px"
        borderColor={last ? 'transparent' : borderColor}
        ml="1rem"
        pl="1.8rem"
        pt={2}
        pb={16}
      >
        {children}
      </Box>
    </>
  )
}
