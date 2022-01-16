import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, BoxProps, Button, IconButton } from '@chakra-ui/react'
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
  const circleAndParents = useCircleAndParents(id)
  const circle = circleAndParents?.[circleAndParents.length - 1]
  if (!circle) return null

  return (
    <Box {...boxProps}>
      {circleAndParents?.map((c, i) => {
        const last = i === circleAndParents.length - 1
        return (
          <span style={{ whiteSpace: 'nowrap' }} key={c.id}>
            {last && i !== 0 && <br />}

            <CircleMemberLink circleId={c.id}>
              <Button
                bg={last ? 'hsl(192deg 76% 87%)' : undefined}
                variant={last ? 'solid' : 'ghost'}
                size={last ? 'md' : 'sm'}
                borderRadius="full"
                fontWeight={last ? 600 : 400}
                ml={last ? '0.3em' : 0}
              >
                {c.role?.name || '?'}
              </Button>
            </CircleMemberLink>

            {last && onEdit && (
              <IconButton
                aria-label=""
                icon={<FiEdit3 />}
                variant="ghost"
                onClick={onEdit}
              />
            )}

            {last && onDelete && (
              <IconButton
                aria-label=""
                icon={<FiTrash2 />}
                variant="ghost"
                onClick={onDelete}
                ml={onEdit ? -3 : undefined}
              />
            )}

            {!last && <ChevronRightIcon mx="-0.5em" />}
          </span>
        )
      }) || null}
    </Box>
  )
}
