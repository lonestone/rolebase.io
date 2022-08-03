import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, BoxProps, chakra, Text } from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
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

  // Take all parents
  // Skip first parent (root circle) when there are other parents
  const parents = circleAndParents.slice(
    circleAndParents.length === 2 ? 0 : 1,
    circleAndParents.length - 1
  )

  return (
    <Box {...boxProps}>
      {parents.length > 0 && (
        <Text mb={1} color="gray.500" lineHeight="1rem">
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
      )}
      <CircleButton circle={circle} />
    </Box>
  )
}
