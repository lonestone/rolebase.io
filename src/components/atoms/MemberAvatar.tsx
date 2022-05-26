import { Avatar, AvatarProps, Tooltip } from '@chakra-ui/react'
import useMember from '@hooks/useMember'
import React from 'react'
import CircleMemberLink from './CircleMemberLink'

interface Props extends AvatarProps {
  id: string
}

export default function MemberAvatar({ id, ...avatarProps }: Props) {
  const member = useMember(id)

  return member ? (
    <CircleMemberLink memberId={member.id}>
      <Tooltip label={member.name} placement="top" hasArrow openDelay={200}>
        <Avatar
          name={member.name}
          src={member.picture || undefined}
          {...avatarProps}
        />
      </Tooltip>
    </CircleMemberLink>
  ) : null
}
