import { Avatar, Button, ButtonProps } from '@chakra-ui/react'
import { MemberEntry } from '@shared/member'
import React from 'react'

interface Props extends ButtonProps {
  member: MemberEntry
  size?: 'md' | 'sm'
  onClick(): void
}

export default function MemberButton({ member, ...buttonProps }: Props) {
  return (
    <Button {...buttonProps}>
      <Avatar
        name={member.name}
        src={member.picture || undefined}
        size={buttonProps.size === 'sm' ? 'xs' : 'sm'}
        ml="-10px"
        mr={2}
      />
      {member.name}
    </Button>
  )
}
