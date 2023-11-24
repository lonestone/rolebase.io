import CircleButton from '@atoms/CircleButton'
import MemberAvatar from '@atoms/MemberAvatar'
import { Box, BoxProps, Flex, Icon, Tooltip } from '@chakra-ui/react'
import { CircleSummaryFragment } from '@gql'
import { ParticipantMember } from '@shared/model/member'
import { RoleLink } from '@shared/model/role'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CircleLinkIcon } from 'src/icons'

interface Props extends BoxProps {
  circle: CircleSummaryFragment
  parentCircle: CircleSummaryFragment
  participants: ParticipantMember[]
}

export default function CircleWithLeaderItem({
  circle,
  parentCircle,
  participants,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
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
          <Box h="8px" w={1} bg="gray.200" _dark={{ bg: 'whiteAlpha.200' }} />

          {members.map((member) => (
            <MemberAvatar
              key={member.id}
              member={member}
              circleId={circle.id}
              size="sm"
            />
          ))}

          {circle.role.link === RoleLink.Parent && (
            <Tooltip
              label={t('CircleWithLeaderItem.linkTooltip', {
                role: parentCircle.role.name,
              })}
              placement="top"
              hasArrow
            >
              <Icon as={CircleLinkIcon} ml={2} />
            </Tooltip>
          )}
        </>
      )}
    </Flex>
  )
}
