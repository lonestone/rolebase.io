import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, BoxProps, chakra, Flex, IconButton, Text } from '@chakra-ui/react'
import CircleLink from '@components/atoms/CircleLink'
import useCircleAndParents from '@hooks/useCircleAndParents'
import React from 'react'
import { FiEdit3, FiTrash2 } from 'react-icons/fi'

interface Props extends BoxProps {
  id: string
  onEdit?(): void
  onDelete?(): void
}

export default function CircleAndParentsButton({
  id,
  onEdit,
  onDelete,
  ...boxProps
}: Props) {
  const circleAndParents = useCircleAndParents(id)
  if (!circleAndParents || circleAndParents.length === 0) return null

  const circle = circleAndParents[circleAndParents.length - 1]
  const parents = circleAndParents.slice(0, circleAndParents.length - 1)

  return (
    <Box {...boxProps}>
      <Flex alignItems="center" h="40px">
        <CircleLink id={circle.id} name={circle.role.name} fontSize="lg" />

        {onEdit && (
          <IconButton
            aria-label=""
            icon={<FiEdit3 />}
            variant="ghost"
            onClick={onEdit}
          />
        )}

        {onDelete && (
          <IconButton
            aria-label=""
            icon={<FiTrash2 />}
            variant="ghost"
            onClick={onDelete}
            ml={onEdit ? -3 : undefined}
          />
        )}
      </Flex>

      <Text mt="-0.4rem" color="gray.500" lineHeight="1rem">
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
              />

              {!last && <ChevronRightIcon mx="0.1rem" />}
            </chakra.span>
          )
        })}
      </Text>
    </Box>
  )
}
