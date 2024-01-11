import { ButtonProps } from '@chakra-ui/react'
import React from 'react'
import useCircle from '../hooks/useCircle'
import CircleButton from './CircleButton'

interface Props extends ButtonProps {
  id: string
}

export default function CircleByIdButton({ id, ...buttonProps }: Props) {
  const circle = useCircle(id)
  return circle ? <CircleButton circle={circle} {...buttonProps} /> : null
}
