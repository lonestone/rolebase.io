import { Button, HStack, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@components/organisms/modals/TaskModal'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import useCurrentMember from '@hooks/useCurrentMember'
import React from 'react'
import { FiPlus } from 'react-icons/fi'

interface Props {
  circleId?: string
}

export default function MeetingActions({ circleId }: Props) {
  const currentMember = useCurrentMember()

  const {
    isOpen: isCreateTaskOpen,
    onOpen: onCreateTaskOpen,
    onClose: onCreateTaskClose,
  } = useDisclosure()

  const {
    isOpen: isCreateThreadOpen,
    onOpen: onCreateThreadOpen,
    onClose: onCreateThreadClose,
  } = useDisclosure()

  return (
    <HStack justifyContent="center">
      <Button size="sm" leftIcon={<FiPlus />} onClick={onCreateTaskOpen}>
        Nouvelle tâche
      </Button>

      <Button size="sm" leftIcon={<FiPlus />} onClick={onCreateThreadOpen}>
        Nouvelle discussion
      </Button>

      {isCreateTaskOpen && (
        <TaskModal
          isOpen
          defaultMemberId={currentMember?.id}
          defaultCircleId={circleId}
          onClose={onCreateTaskClose}
        />
      )}

      {isCreateThreadOpen && (
        <ThreadEditModal
          isOpen
          defaultCircleId={circleId}
          onClose={onCreateThreadClose}
        />
      )}
    </HStack>
  )
}
