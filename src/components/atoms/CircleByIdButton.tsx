import { ButtonProps } from '@chakra-ui/react'
import useCircle from '@hooks/useCircle'
import React from 'react'
import CircleButton from './CircleButton'

interface Props extends ButtonProps {
  circleId: string
}

export default function CircleByIdButton({ circleId, ...buttonProps }: Props) {
  const circle = useCircle(circleId)
  return circle ? <CircleButton circle={circle} {...buttonProps} /> : null
}
