import CircleButton from '@atoms/CircleButton'
import CircleByIdButton from '@atoms/CircleByIdButton'
import CircleLink from '@atoms/CircleLink'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, BoxProps, chakra, HStack, Text } from '@chakra-ui/react'
import { CircleFullFragment } from '@gql'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { RoleLink } from '@shared/model/role'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { FiLink2 } from 'react-icons/fi'

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

  // Represented circle?
  const representedCircleId = useMemo(() => {
    if (circle.role.link === RoleLink.No) return
    if (circle.role.link === RoleLink.Parent) return circle.parentId
    if (typeof circle.role.link === 'string') return circle.role.link
  }, [circle])

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
        {representedCircleId && (
          <>
            <Box color="gray.500" _dark={{ color: 'gray.300' }}>
              <FiLink2 />
            </Box>
            <CircleByIdButton id={representedCircleId} size={size} />
          </>
        )}
      </HStack>
    </Box>
  )
}
