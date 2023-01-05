import { Box, Flex, Heading, Tag, useColorMode } from '@chakra-ui/react'
import React from 'react'

interface Props {
  index: number
  stepId: string
  title: string
  current: boolean
  last: boolean
  onNumberClick?(): void
  children: React.ReactNode
}

export default function MeetingStepLayout({
  index,
  stepId,
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
        {/* Anchor */}
        <Box id={`step-${stepId}`} transform="translateY(-100px)" />

        <Tag
          color={tagTextColor}
          bg={current ? tagCurrentColor : tagColor}
          _hover={current || !onNumberClick ? undefined : { bg: tagHoverColor }}
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
      <Box pt={7} pb={20}>
        {children}
      </Box>
    </>
  )
}
