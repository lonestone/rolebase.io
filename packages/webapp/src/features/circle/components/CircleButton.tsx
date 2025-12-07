import { Button, ButtonProps } from '@chakra-ui/react'
import { CircleSummaryFragment } from '@gql'
import { circleColor } from '@rolebase/shared/helpers/circleColor'
import { textEllipsis } from '@utils/textEllipsis'
import React from 'react'
import CircleMemberLink from './CircleMemberLink'

interface Props extends ButtonProps {
  circle: CircleSummaryFragment
  noEllipsis?: boolean
  parentId?: string
}

export default function CircleButton({
  circle,
  noEllipsis,
  parentId,
  ...buttonProps
}: Props) {
  const hue = circle.role.colorHue ?? undefined

  return (
    <CircleMemberLink circleId={circle.id} parentId={parentId} tabIndex={-1}>
      <Button
        borderRadius="full"
        // Handle long names
        whiteSpace="normal"
        // Color
        bg={circleColor(92, hue)}
        _hover={{ bg: circleColor(87, hue) }}
        _dark={{
          bg: circleColor(25, hue),
          _hover: { bg: circleColor(30, hue) },
        }}
        {...buttonProps}
        size={buttonProps.size || 'sm'}
      >
        {noEllipsis ? circle.role.name : textEllipsis(circle.role.name, 20)}
      </Button>
    </CircleMemberLink>
  )
}
