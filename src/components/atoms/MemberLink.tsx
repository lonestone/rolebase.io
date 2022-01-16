import { Button } from '@chakra-ui/react'
import { MemberEntry } from '@shared/member'
import React from 'react'
import CircleMemberLink from './CircleMemberLink'

interface Props {
  member: MemberEntry
}

export default function MemberLink({ member }: Props) {
  return (
    <CircleMemberLink memberId={member.id}>
      <Button variant="link" color="black" textDecoration="none">
        {member.name}
      </Button>
    </CircleMemberLink>
  )
}
