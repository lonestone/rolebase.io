import { Avatar, Button } from '@chakra-ui/react'
import { MemberEntry } from '@shared/member'
import React from 'react'

interface Props {
  member: MemberEntry
  size: 'sm' | 'md'
  onClick(): void
}

export default function MemberButton({ member, size, onClick }: Props) {
  return (
    <Button onClick={onClick} size={size}>
      <Avatar
        name={member.name}
        src={member.picture || undefined}
        size={size === 'sm' ? 'xs' : 'sm'}
        ml="-10px"
        mr={2}
      />
      {member.name}
    </Button>
  )
}
