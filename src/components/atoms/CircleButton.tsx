import { Button, ButtonProps } from '@chakra-ui/react'
import { CircleWithRoleEntry } from '@shared/model/circle'
import React from 'react'
import { textEllipse } from 'src/utils'
import CircleMemberLink from './CircleMemberLink'

interface Props extends ButtonProps {
  circle: CircleWithRoleEntry
}

export default function CircleButton({ circle, ...buttonProps }: Props) {
  return (
    <CircleMemberLink circleId={circle.id} tabIndex={-1}>
      <Button size="sm" borderRadius="full" {...buttonProps}>
        {textEllipse(circle.role.name, 20)}
      </Button>
    </CircleMemberLink>
  )
}
