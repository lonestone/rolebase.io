import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, BoxProps, chakra, HStack, Text } from '@chakra-ui/react'
import { CircleFullFragment } from '@gql'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { CircleParentLinkIcon } from 'src/icons'
import CircleButton from './CircleButton'
import CircleByIdButton from './CircleByIdButton'
import CircleLink from './CircleLink'

interface Props extends BoxProps {
  circle: CircleFullFragment
  size?: 'sm' | 'md' | 'lg'
}

export default function CircleAndParentsLinks({
  circle,
  size,
  ...boxProps
}: Props) {
  const circles = useStoreState((state) => state.org.circles)

  // Get circle parents
  const circleAndParents = useMemo(() => {
    if (!circles) return undefined
    return getCircleAndParents(circles, circle.id)
  }, [circles, circle.id])

  if (!circleAndParents || circleAndParents.length === 0) return null

  // Take all parents
  // Skip first parent (root circle) when there are other parents
  const parents = circleAndParents.slice(
    circleAndParents.length === 2 ? 0 : 1,
    circleAndParents.length - 1
  )

  return (
    <Box pb="1em" mb={1} {...boxProps}>
      <Text
        mb={1}
        h="1em"
        lineHeight="1em"
        color="gray.500"
        _dark={{ color: 'gray.300' }}
      >
        {parents.length > 0 &&
          parents.map((c, i) => {
            const last = i === parents.length - 1
            return (
              <chakra.span whiteSpace="nowrap" key={c.id}>
                <CircleLink
                  id={c.id}
                  name={c.role.name}
                  color="inherit"
                  fontSize="sm"
                  fontWeight={400}
                  whiteSpace="normal"
                />

                {!last && <ChevronRightIcon mx="0.1rem" />}
              </chakra.span>
            )
          })}
      </Text>
      <HStack alignItems="center">
        <CircleButton circle={circle} size={size} noEllipsis />
        {circle.role.parentLink && circle.parentId && (
          <>
            <Box color="gray.500" _dark={{ color: 'gray.300' }}>
              <CircleParentLinkIcon size="1.5em" />
            </Box>
            <CircleByIdButton id={circle.parentId} size={size} />
          </>
        )}
      </HStack>
    </Box>
  )
}
