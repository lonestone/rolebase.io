import { Button, ButtonProps, useColorMode } from '@chakra-ui/react'
import { CircleWithRoleFragment } from '@gql'
import { textEllipsis } from '@utils/textEllipsis'
import React from 'react'
import { circleColor } from 'src/theme'
import CircleMemberLink from './CircleMemberLink'

interface Props extends ButtonProps {
  circle: CircleWithRoleFragment
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
        borderRadius="full"
        {...buttonProps}
        size={buttonProps.size || 'sm'}
      >
        {noEllipsis ? circle.role.name : textEllipsis(circle.role.name, 20)}
      </Button>
    </CircleMemberLink>
  )
}
