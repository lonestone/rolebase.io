import { Button } from '@chakra-ui/react'
import React from 'react'
import CircleMemberLink from './CircleMemberLink'

interface Props {
  id: string
  name: string
}

export default function MemberLink({ id, name }: Props) {
  return (
    <CircleMemberLink memberId={id}>
      <Button variant="link" color="inherit" textDecoration="none">
        {name}
      </Button>
    </CircleMemberLink>
  )
}
