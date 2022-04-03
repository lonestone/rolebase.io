import { Button, ButtonProps } from '@chakra-ui/react'
import { CircleWithRoleEntry } from '@shared/circle'
import React from 'react'
import CircleMemberLink from './CircleMemberLink'

interface Props extends ButtonProps {
  circle: CircleWithRoleEntry
}

export default function CircleButton({ circle, ...buttonProps }: Props) {
  return (
    <CircleMemberLink circleId={circle.id} tabIndex={-1}>
      <Button size="sm" borderRadius="full" {...buttonProps}>
        {circle.role.name}
      </Button>
    </CircleMemberLink>
  )
}
