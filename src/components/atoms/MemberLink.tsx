import { Button, useColorMode } from '@chakra-ui/react'
import { MemberEntry } from '@shared/member'
import React from 'react'
import CircleMemberLink from './CircleMemberLink'

interface Props {
  member: Pick<MemberEntry, 'id' | 'name'>
}

export default function MemberLink({ member }: Props) {
  const { colorMode } = useColorMode()
  return (
    <CircleMemberLink memberId={member.id}>
      <Button
        variant="link"
        color={colorMode === 'light' ? 'black' : 'white'}
        textDecoration="none"
      >
        {member.name}
      </Button>
    </CircleMemberLink>
  )
}
