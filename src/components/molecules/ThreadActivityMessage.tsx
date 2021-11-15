import { Avatar, Box, Flex } from '@chakra-ui/react'
import Markdown from '@components/atoms/Markdown'
import { ActivityMessage } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'

interface Props {
  activity: WithId<ActivityMessage>
}

export function ThreadActivityMessage({ activity }: Props) {
  const members = useStoreState((state) => state.members.entries)
  const member = useMemo(
    () => members?.find((m) => m.userId === activity.userId),
    [activity.userId, members]
  )

  return (
    <Flex p={3} _hover={{ background: '#fafafa' }}>
      <Avatar
        name={member?.name || '?'}
        src={member?.picture || undefined}
        size="md"
        mr={3}
      />
      <Box>
        <strong>{member?.name || '[Utilisateur non invité]'}</strong>
        <Markdown>{activity.message}</Markdown>
      </Box>
    </Flex>
  )
}
