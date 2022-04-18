import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, BoxProps, chakra, Flex, Text } from '@chakra-ui/react'
import CircleLink from '@components/atoms/CircleLink'
import useCircleAndParents from '@hooks/useCircleAndParents'
import React from 'react'

interface Props extends BoxProps {
  id: string
}

export default function CircleAndParentsLinks({ id, ...boxProps }: Props) {
  const circleAndParents = useCircleAndParents(id)
  if (!circleAndParents || circleAndParents.length === 0) return null

  const circle = circleAndParents[circleAndParents.length - 1]
  const parents = circleAndParents.slice(0, circleAndParents.length - 1)

  return (
    <Box pb={3} {...boxProps}>
      <Flex align="center" minH="32px">
        <CircleLink id={circle.id} name={circle.role.name} fontSize="lg" />
      </Flex>

      <Text mt="-0.2rem" color="gray.500" lineHeight="1rem">
        {parents.map((c, i) => {
          const last = i === parents.length - 1
          return (
            <chakra.span whiteSpace="nowrap" key={c.id}>
              <CircleLink
                id={c.id}
                name={c.role.name}
                color="gray.500"
                fontSize="sm"
                fontWeight={400}
                whiteSpace="normal"
              />

              {!last && <ChevronRightIcon mx="0.1rem" />}
            </chakra.span>
          )
        })}
      </Text>
    </Box>
  )
}
