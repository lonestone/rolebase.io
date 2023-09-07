import { Button, ButtonProps } from '@chakra-ui/react'
import { CircleWithRoleFragment } from '@gql'
import { circleColor } from '@shared/helpers/circleColor'
import { textEllipsis } from '@utils/textEllipsis'
import React from 'react'
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
  const hue = circle.role.colorHue ?? undefined

  return (
    <CircleMemberLink circleId={circle.id} tabIndex={-1}>
      <Button
        borderRadius="full"
        bg={circleColor('92%', hue)}
        _hover={{ bg: circleColor('87%', hue) }}
        _dark={{
          bg: circleColor('25%', hue),
          _hover: { bg: circleColor('30%', hue) },
        }}
        {...buttonProps}
        size={buttonProps.size || 'sm'}
      >
        {noEllipsis ? circle.role.name : textEllipsis(circle.role.name, 20)}
      </Button>
    </CircleMemberLink>
  )
}
