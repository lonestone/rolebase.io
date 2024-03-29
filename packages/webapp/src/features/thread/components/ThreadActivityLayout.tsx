import ActionsMenu from '@/common/atoms/ActionsMenu'
import { useHoverItemStyle } from '@/common/hooks/useHoverItemStyle'
import MemberAvatar from '@/member/components/MemberAvatar'
import MemberLink from '@/member/components/MemberLink'
import useCurrentMember from '@/member/hooks/useCurrentMember'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'
import { Avatar, Box, Flex, Link, Text, useDisclosure } from '@chakra-ui/react'
import { ThreadActivityFragment } from '@gql'
import { ThreadActivityChangeStatusFragment } from '@rolebase/shared/model/thread_activity'
import { useStoreState } from '@store/hooks'
import { format } from 'date-fns'
import React, { ReactNode, useContext, useMemo } from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { ThreadContext } from '../contexts/ThreadContext'
import ActivityDeleteModal from '../modals/ActivityDeleteModal'
import ThreadActivityAnchor from './ThreadActivityAnchor'

interface Props {
  activity: ThreadActivityFragment | ThreadActivityChangeStatusFragment
  onEdit?(): void
  allowDelete?: boolean
  children: ReactNode
}

export default function ThreadActivityLayout({
  activity,
  onEdit,
  allowDelete,
  children,
}: Props) {
  const hover = useHoverItemStyle()
  const { path, handleMarkUnread } = useContext(ThreadContext)!

  // Retrieve author member
  const members = useStoreState((state) => state.org.members)
  const member = useMemo(
    () => members?.find((m) => m.userId === activity.userId),
    [activity.userId, members]
  )

  // Can delete?
  const currentMember = useCurrentMember()
  const isAdmin = useOrgAdmin()
  const isUserOwner = currentMember?.userId === activity.userId
  const canDelete = allowDelete && (isAdmin || isUserOwner)

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  return (
    <Flex p={3} pl={6} _hover={hover} role="group">
      <ThreadActivityAnchor activityId={activity.id} />

      {member ? (
        <MemberAvatar member={member} noTooltip size="md" mr={3} />
      ) : (
        <Avatar name="?" size="md" mr={3} />
      )}

      <Box flex="1">
        <ActionsMenu
          variant="outline"
          float="right"
          opacity={0}
          _groupHover={{ opacity: 1 }}
          onEdit={onEdit}
          onDelete={canDelete ? onDeleteOpen : undefined}
          onMarkUnread={() => handleMarkUnread(activity.id)}
        />

        <Text>
          {member && <MemberLink id={member.id} name={member.name} />}
          <Link
            as={ReachLink}
            to={`${path}#activity-${activity.id}`}
            fontSize="sm"
            fontWeight="normal"
            ml={2}
            color="gray.400"
          >
            {format(new Date(activity.createdAt), 'HH:mm')}
          </Link>
        </Text>

        {children}
      </Box>

      {isDeleteOpen && (
        <ActivityDeleteModal
          isOpen
          activity={activity}
          onClose={onDeleteClose}
        />
      )}
    </Flex>
  )
}
