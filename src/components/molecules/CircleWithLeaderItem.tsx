import { Circle, Flex } from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import MemberAvatar from '@components/atoms/MemberAvatar'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { ParticipantMember } from '@shared/model/member'
import React, { useMemo } from 'react'

interface Props {
  circle: CircleWithRoleEntry
  participants: ParticipantMember[]
}

export default function CircleWithLeaderItem({ circle, participants }: Props) {
  const membersIds = useMemo(
    () =>
      participants
        .filter((p) => p.circlesIds.indexOf(circle.id) !== -1)
        .map((p) => p.member.id),
    [circle, participants]
  )

  return (
    <Flex>
      {membersIds.length === 0 ? (
        <Circle size={8} bg="gray.50" _dark={{ bg: 'gray.700' }} />
      ) : (
        membersIds.map((memberId) => (
          <MemberAvatar key={memberId} id={memberId} size="sm" />
        ))
      )}
      <CircleButton circle={circle} ml={1} />
    </Flex>
  )
}
