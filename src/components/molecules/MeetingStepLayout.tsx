import { Box, Flex, Heading, Tag } from '@chakra-ui/react'
import React from 'react'

interface Props {
  index: number
  title: string
  current: boolean
  last: boolean
  children: React.ReactNode
}

export default function MeetingStepLayout({
  index,
  title,
  current,
  last,
  children,
}: Props) {
  return (
    <>
      <Flex alignItems="center">
        <Tag
          colorScheme={current ? 'green' : undefined}
          size="lg"
          borderRadius="full"
          mr={3}
        >
          {index + 1}
        </Tag>
        <Heading as="h2" size="sm">
          {title}
        </Heading>
      </Flex>
      <Box
        borderLeft="2px"
        borderColor={last ? 'transparent' : '#EDF2F7'}
        ml="1rem"
        pl="1.8rem"
        pt={2}
        pb={5}
      >
        {children}
      </Box>
    </>
  )
}
