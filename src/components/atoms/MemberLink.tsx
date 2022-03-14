import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import CircleMemberLink from './CircleMemberLink'

interface Props extends ButtonProps {
  id: string
  name: string
}

export default function MemberLink({ id, name, ...butonsProps }: Props) {
  return (
    <CircleMemberLink memberId={id} tabIndex={-1}>
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
