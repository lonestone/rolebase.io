import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import HourLink from '@components/atoms/HourLink'
import MemberLink from '@components/atoms/MemberLink'
import ActionsMenu from '@components/molecules/ActionsMenu'
import ActivityDeleteModal from '@components/organisms/thread/ActivityDeleteModal'
import { ActivityEntry } from '@shared/model/thread_activity'
import { WithId } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React, { ReactNode, useMemo } from 'react'

interface Props {
  activity: WithId<ActivityEntry>
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
  const members = useStoreState((state) => state.members.entries)
  const member = useMemo(
    () => members?.find((m) => m.userId === activity.userId),
    [activity.userId, members]
  )
  const { colorMode } = useColorMode()

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  return (
    <Flex
      id={`activity-${activity.id}`}
      p={3}
      _hover={{
        bg:
          colorMode === 'light'
            ? 'rgba(0, 0, 0, 0.02)'
            : 'rgba(255, 255, 255, 0.02)',
      }}
      role="group"
    >
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
