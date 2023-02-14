import { Avatar, Button, ButtonProps } from '@chakra-ui/react'
import { MemberFragment } from '@gql'
import { textEllipsis } from '@utils/textEllipsis'
import React from 'react'

interface Props extends ButtonProps {
  member: MemberFragment
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
      {textEllipsis(member.name, 30)}
    </Button>
  )
}
