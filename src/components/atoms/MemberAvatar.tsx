import { Avatar, AvatarProps, Tooltip } from '@chakra-ui/react'
import useMember from '@hooks/useMember'
import React from 'react'
import CircleMemberLink from './CircleMemberLink'

interface Props extends AvatarProps {
  id: string
  circleId?: string
}

export default function MemberAvatar({ id, circleId, ...avatarProps }: Props) {
  const member = useMember(id)

  return member ? (
    <CircleMemberLink memberId={member.id} circleId={circleId}>
      <Tooltip label={member.name} placement="top" hasArrow>
        <Avatar
          name={member.name}
          src={member.picture || undefined}
          {...avatarProps}
        />
      </Tooltip>
    </CircleMemberLink>
  ) : null
}
