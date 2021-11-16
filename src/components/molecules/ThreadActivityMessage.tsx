import { Avatar, Box, Flex, IconButton, Link, Text } from '@chakra-ui/react'
import Markdown from '@components/atoms/Markdown'
import { ActivityMessage } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import { format } from 'date-fns'
import React, { useMemo, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'
import { ThreadActivityMessageEdit } from './ThreadActivityMessageEdit'

interface Props {
  activity: WithId<ActivityMessage>
}

export function ThreadActivityMessage({ activity }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const members = useStoreState((state) => state.members.entries)
  const member = useMemo(
    () => members?.find((m) => m.userId === activity.userId),
    [activity.userId, members]
  )

  // Edition
  const isUserOwner = userId === activity.userId
  const [editing, setEditing] = useState(false)

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
        {isUserOwner && !editing && (
          <IconButton
            aria-label="Modifier"
            icon={<FiEdit3 />}
            size="sm"
            float="right"
            display="none"
            _groupHover={{ display: 'inline-flex' }}
            onClick={() => setEditing(true)}
          />
        )}

        <Text>
          {member && (
            <Link
              as={ReachLink}
              to={
                member ? `/orgs/${activity.orgId}/?memberId=${member.id}` : '#'
              }
              fontWeight="bold"
              textDecoration="none"
            >
              {member?.name || '[Utilisateur non invité]'}
            </Link>
          )}
          <Link
            as={ReachLink}
            to={`#${activity.id}`}
            ml={2}
            color="gray.400"
            textDecoration="none"
          >
            {format(activity.createdAt.toDate(), 'HH:mm')}
          </Link>
        </Text>

        {!editing ? (
          <Markdown>{activity.message}</Markdown>
        ) : (
          <ThreadActivityMessageEdit
            id={activity.id}
            defaultMessage={activity.message}
            onClose={() => setEditing(false)}
          />
        )}
      </Box>
    </Flex>
  )
}
