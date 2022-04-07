import { Avatar, AvatarProps } from '@chakra-ui/react'
import useMember from '@hooks/useMember'
import React from 'react'

interface Props extends AvatarProps {
  id: string
}

export default function MemberAvatar({ id, ...avatarProps }: Props) {
  const member = useMember(id)

  return member ? (
    <Avatar
      name={member.name}
      src={member.picture || undefined}
      {...avatarProps}
    />
  ) : null
}
