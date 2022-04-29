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
  const borderColor = colorMode === 'light' ? 'gray.100' : 'whiteAlpha.200'
  const tagColor = borderColor
  const tagCurrentColor = 'green.600'
  const tagHoverColor = colorMode === 'light' ? 'gray.200' : 'whiteAlpha.300'
  const tagTextColor = current
    ? 'white'
    : colorMode === 'light'
    ? 'black'
    : 'gray.300'

  return (
    <>
      <Flex alignItems="center">
        <Tag
          color={tagTextColor}
          bg={current ? tagCurrentColor : tagColor}
          _hover={current ? undefined : { bg: tagHoverColor }}
          variant="solid"
          size="lg"
          fontWeight="bold"
          borderRadius="full"
          mr={4}
          cursor={!current && onNumberClick ? 'pointer' : 'default'}
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
