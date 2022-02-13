import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import CircleMemberLink from './CircleMemberLink'

interface Props extends ButtonProps {
  id: string
  name: string
}

export default function CircleLink({ id, name, ...butonsProps }: Props) {
  return (
    <CircleMemberLink circleId={id}>
      <Button
        variant="link"
        color="inherit"
        textDecoration="none"
        minW={0}
        {...butonsProps}
      >
        {name}
      </Button>
    </CircleMemberLink>
  )
}
