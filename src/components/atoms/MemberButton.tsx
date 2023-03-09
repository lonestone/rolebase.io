import { Avatar, Button, ButtonProps, forwardRef } from '@chakra-ui/react'
import { MemberSummaryFragment } from '@gql'
import { textEllipsis } from '@utils/textEllipsis'
import React from 'react'

interface Props extends ButtonProps {
  member: Pick<MemberSummaryFragment, 'name' | 'picture'>
  maxNameLength?: number
}

export default forwardRef(function MemberButton(
  { member, maxNameLength = 30, ...buttonProps }: Props,
  ref
) {
  return (
    <Button ref={ref} {...buttonProps}>
      <Avatar
        name={member.name}
        src={member.picture || undefined}
        size={buttonProps.size === 'sm' ? 'xs' : 'sm'}
        ml="-10px"
        mr={2}
      />
      {textEllipsis(member.name, maxNameLength)}
    </Button>
  )
})
