import { Avatar, Button, ButtonProps } from '@chakra-ui/react'
import { MemberEntry } from '@shared/model/member'
import React from 'react'
import { textEllipse } from 'src/utils'

interface Props extends ButtonProps {
  member: MemberEntry
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
      {textEllipse(member.name, 40)}
    </Button>
  )
}
