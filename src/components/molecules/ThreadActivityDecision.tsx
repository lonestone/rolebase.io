import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { HourLink } from '@components/atoms/HourLink'
import Markdown from '@components/atoms/Markdown'
import { MemberLink } from '@components/atoms/MemberLink'
import { ActivityDecision } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { FiEdit3 } from 'react-icons/fi'

interface Props {
  activity: WithId<ActivityDecision>
}

export function ThreadActivityDecision({ activity }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const members = useStoreState((state) => state.members.entries)
  const member = useMemo(
    () => members?.find((m) => m.userId === activity.userId),
    [activity.userId, members]
  )

  // Edition
  const isUserOwner = userId === activity.userId

  return (
    <Flex
      id={activity.id}
      p={3}
      _hover={{ background: '#fafafa' }}
      role="group"
    >
      <Box flex="1">
        {isUserOwner && (
          <IconButton
            aria-label="Modifier"
            icon={<FiEdit3 />}
            size="sm"
            float="right"
            display="none"
            _groupHover={{ display: 'inline-flex' }}
          />
        )}

        <Text fontStyle="italic">
          {member && <MemberLink member={member} />} a ajouté une décision.
          <HourLink timestamp={activity.createdAt} />
        </Text>

        <Box mt={3} p={3} background="gray.100" borderRadius="10px">
          <strong>Décision :</strong>
          <Markdown mb={3}>{activity.decision}</Markdown>
          <strong>Explications :</strong>
          <Markdown>{activity.explanation}</Markdown>
        </Box>
      </Box>
    </Flex>
  )
}
