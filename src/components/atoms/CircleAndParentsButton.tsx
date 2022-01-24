import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Button,
  chakra,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import useCircleAndParents from '@hooks/useCircleAndParents'
import React from 'react'
import { FiEdit3, FiTrash2 } from 'react-icons/fi'
import CircleMemberLink from './CircleMemberLink'

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
  const { colorMode } = useColorMode()
  const circleAndParents = useCircleAndParents(id)
  if (!circleAndParents || circleAndParents.length === 0) return null

  const circle = circleAndParents[circleAndParents.length - 1]
  const parents = circleAndParents.slice(0, circleAndParents.length - 1)

  return (
    <Box {...boxProps}>
      <Heading as="h2" size="md">
        <Flex alignItems="center" h="40px">
          <CircleMemberLink circleId={circle.id}>
            <Button variant="link" size="md" fontWeight={700}>
              {circle.role.name}
            </Button>
          </CircleMemberLink>

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
      </Heading>

      <Text mt="-0.4rem" color="gray.500" lineHeight="1rem">
        {parents.map((c, i) => {
          const last = i === parents.length - 1
          return (
            <chakra.span whiteSpace="nowrap" key={c.id}>
              <CircleMemberLink circleId={c.id}>
                <Button
                  variant="link"
                  color="gray.500"
                  size="sm"
                  borderRadius="full"
                  fontWeight={400}
                >
                  {c.role.name}
                </Button>
              </CircleMemberLink>

              {!last && <ChevronRightIcon mx="0.1rem" />}
            </chakra.span>
          )
        })}
      </Text>
    </Box>
  )
}
