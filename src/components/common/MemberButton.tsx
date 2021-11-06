import { Avatar, Button } from '@chakra-ui/react'
import React from 'react'
import { MemberEntry } from '@shared/member'

interface Props {
  member: MemberEntry
  onClick(): void
}

export default function MemberButton({ member, onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <Avatar
        name={member.name}
        src={member.picture || undefined}
        size="sm"
        ml="-10px"
        mr={2}
      />
      {member.name}
    </Button>
  )
}
