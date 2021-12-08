import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react'
import HourLink from '@components/atoms/HourLink'
import MemberLink from '@components/atoms/MemberLink'
import { ActivityEntry } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { ReactNode, useMemo } from 'react'
import { FiEdit3 } from 'react-icons/fi'

interface Props {
  activity: WithId<ActivityEntry>
  onEdit?(): void
  children: ReactNode
}

export default function ThreadActivityLayout({
  activity,
  onEdit,
  children,
}: Props) {
  const members = useStoreState((state) => state.members.entries)
  const member = useMemo(
    () => members?.find((m) => m.userId === activity.userId),
    [activity.userId, members]
  )

  return (
    <Flex
      id={activity.id}
      p={3}
      _hover={{ background: '#fafafa' }}
      role="group"
    >
      <Avatar
        name={member?.name || '?'}
        src={member?.picture || undefined}
        size="md"
        mr={3}
      />
      <Box flex="1">
        {onEdit && (
          <IconButton
            aria-label="Modifier"
            icon={<FiEdit3 />}
            size="sm"
            float="right"
            display="none"
            _groupHover={{ display: 'inline-flex' }}
            onClick={onEdit}
          />
        )}

        <Text>
          {member && <MemberLink member={member} />}
          <HourLink timestamp={activity.createdAt} ml={2} />
        </Text>

        {children}
      </Box>
    </Flex>
  )
}
