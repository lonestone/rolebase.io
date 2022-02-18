import { Button, HStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import TaskModal from '@components/organisms/modals/TaskModal'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import { MeetingEntry } from '@shared/meeting'
import { MemberEntry } from '@shared/member'

interface Props {
  currentMember?: MemberEntry
  meeting?: MeetingEntry
}

export default function MeetingActivitiesCreate({
  currentMember,
  meeting,
}: Props) {
  // Subscribe meeting steps
  const {
    isOpen: isCreateTaskOpen,
    onOpen: onCreateTaskOpen,
    onClose: onCreateTaskClose,
  } = useDisclosure()

  //thread creation modal
  const {
    isOpen: isCreateThreadOpen,
    onOpen: onCreateThreadOpen,
    onClose: onCreateThreadClose,
  } = useDisclosure()
  return (
    <HStack py={3} alignItems="top">
      <Button size="sm" ml={1} leftIcon={<FiPlus />} onClick={onCreateTaskOpen}>
        Nouvelle tâche
      </Button>
      <Button
        size="sm"
        ml={1}
        leftIcon={<FiPlus />}
        onClick={onCreateThreadOpen}
      >
        Nouvelle discussion
      </Button>

      {isCreateTaskOpen && (
        <TaskModal
          isOpen
          defaultMemberId={currentMember?.id}
          onClose={onCreateTaskClose}
          defaultCircleId={meeting?.circleId}
        />
      )}
      {isCreateThreadOpen && (
        <ThreadEditModal
          defaultCircleId={meeting?.circleId}
          isOpen
          onClose={onCreateThreadClose}
        />
      )}
    </HStack>
  )
}
