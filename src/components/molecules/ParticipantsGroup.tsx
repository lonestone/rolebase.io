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
  ...rest
}: ParticipantsGroupProps) {
  return (
    <AvatarGroup
      spacing={size === 'sm' ? '-0.5rem' : '-0.75rem'}
      size={size}
      max={max}
      {...rest}
    >
      {participants.map(
        (member, i) =>
          member && (
            <Avatar
              key={i}
              border="1px solid"
              borderColor="white"
              _dark={{
                borderColor: `var(--chakra-colors-gray-800)`,
              }}
              name={member.name}
              src={member.picture || undefined}
              bg="gray.500"
            />
          )
      )}
    </AvatarGroup>
  )
}
