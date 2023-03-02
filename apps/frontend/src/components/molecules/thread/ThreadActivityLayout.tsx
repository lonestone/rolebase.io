import HourLink from '@atoms/HourLink'
import MemberLink from '@atoms/MemberLink'
import { Avatar, Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { ThreadActivityFragment } from '@gql'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import ActionsMenu from '@molecules/ActionsMenu'
import ActivityDeleteModal from '@organisms/thread/ActivityDeleteModal'
import { useStoreState } from '@store/hooks'
import React, { ReactNode, useMemo } from 'react'

interface Props {
  activity: ThreadActivityFragment
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
  const members = useStoreState((state) => state.org.members)
  const member = useMemo(
    () => members?.find((m) => m.userId === activity.userId),
    [activity.userId, members]
  )
  const hover = useHoverItemStyle()

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  return (
    <Flex id={`activity-${activity.id}`} p={3} _hover={hover} role="group">
      <Avatar
        name={member?.name || '?'}
        src={member?.picture || undefined}
        size="md"
        mr={3}
      />
      <Box flex="1">
        {(onEdit || allowDelete) && (
          <ActionsMenu
            variant="solid"
            float="right"
            opacity={0}
            _groupHover={{ opacity: 1 }}
            onEdit={onEdit}
            onDelete={allowDelete ? onDeleteOpen : undefined}
          />
        )}

        <Text>
          {member && <MemberLink id={member.id} name={member.name} />}
          <HourLink activityId={activity.id} date={activity.createdAt} ml={2} />
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
