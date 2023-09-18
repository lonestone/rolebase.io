import CircleButton from '@atoms/CircleButton'
import MemberAvatar from '@atoms/MemberAvatar'
import { Box, BoxProps, Flex } from '@chakra-ui/react'
import { CircleWithRoleFragment } from '@gql'
import { ParticipantMember } from '@shared/model/member'
import React, { useMemo } from 'react'

interface Props extends BoxProps {
  circle: CircleWithRoleFragment
  participants: ParticipantMember[]
}

export default function CircleWithLeaderItem({
  circle,
  participants,
  ...boxProps
}: Props) {
  const members = useMemo(
    () =>
      participants
        .filter((p) => p.circlesIds.indexOf(circle.id) !== -1)
        .map((p) => p.member),
    [circle, participants]
  )

  return (
    <Flex alignItems="center" {...boxProps}>
      <CircleButton circle={circle} />

      {members.length !== 0 && (
        <>
          <Box h="8px" w={1} bg={'gray.200'} _dark={{ bg: 'whiteAlpha.200' }} />

          {members.map((member) => (
            <MemberAvatar
              key={member.id}
              member={member}
              circleId={circle.id}
              size="sm"
            />
          ))}
        </>
      )}
    </Flex>
  )
}
