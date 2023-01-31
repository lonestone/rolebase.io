import CircleButton from '@atoms/CircleButton'
import MemberAvatar from '@atoms/MemberAvatar'
import { Box, Circle, Flex, Tooltip } from '@chakra-ui/react'
import { CircleWithRoleFragment } from '@gql'
import { ParticipantMember } from '@shared/model/member'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  circle: CircleWithRoleFragment
  participants: ParticipantMember[]
}

export default function CircleWithLeaderItem({ circle, participants }: Props) {
  const { t } = useTranslation()

  const membersIds = useMemo(
    () =>
      participants
        .filter((p) => p.circlesIds.indexOf(circle.id) !== -1)
        .map((p) => p.member.id),
    [circle, participants]
  )

  return (
    <Flex alignItems="center">
      <CircleButton circle={circle} />

      <Box h="8px" w={1} bg={'gray.200'} _dark={{ bg: 'whiteAlpha.200' }} />

      {membersIds.length === 0 ? (
        <Tooltip
          label={t('CircleWithLeaderItem.notAssigned')}
          placement="top"
          hasArrow
        >
          <Circle size={8} bg="gray.100" _dark={{ bg: 'whiteAlpha.100' }} />
        </Tooltip>
      ) : (
        membersIds.map((memberId) => (
          <MemberAvatar
            key={memberId}
            id={memberId}
            circleId={circle.id}
            size="sm"
          />
        ))
      )}
    </Flex>
  )
}
