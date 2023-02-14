import { Avatar, AvatarGroup, AvatarGroupProps } from '@chakra-ui/react'
import { MemberFragment } from '@gql'
import React from 'react'

type ParticipantsGroupProps = {
  participants: MemberFragment[]
} & Omit<AvatarGroupProps, 'children'>

export default function ParticipantsGroup({
  participants,
  max,
  size,
  ...avatarGroupProps
}: ParticipantsGroupProps) {
  return (
    <AvatarGroup
      spacing={size === 'sm' ? '-0.5rem' : '-0.75rem'}
      size={size}
      max={max}
      {...avatarGroupProps}
    >
      {participants.map(
        (member, i) =>
          member && (
            <Avatar
              key={i}
              border="1px solid"
              name={member.name}
              src={member.picture || undefined}
            />
          )
      )}
    </AvatarGroup>
  )
}
