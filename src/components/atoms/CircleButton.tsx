import { Button, ButtonProps, useColorMode } from '@chakra-ui/react'
import { CircleWithRoleEntry } from '@shared/model/circle'
import React from 'react'
import { circleColor } from 'src/theme'
import { textEllipsis } from 'src/utils'
import CircleMemberLink from './CircleMemberLink'

interface Props extends ButtonProps {
  circle: CircleWithRoleEntry
  noEllipsis?: boolean
}

export default function CircleButton({
  circle,
  noEllipsis,
  ...buttonProps
}: Props) {
  const { colorMode } = useColorMode()

  return (
    <CircleMemberLink circleId={circle.id} tabIndex={-1}>
      <Button
        bg={circleColor(
          colorMode === 'light' ? '92%' : '18%',
          circle.role.colorHue ?? undefined
        )}
        size="sm"
        borderRadius="full"
        {...buttonProps}
      >
        {noEllipsis ? circle.role.name : textEllipsis(circle.role.name, 20)}
      </Button>
    </CircleMemberLink>
  )
}
