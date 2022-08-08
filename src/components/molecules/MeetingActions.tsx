import { Button, HStack, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@components/organisms/task/TaskModal'
import ThreadEditModal from '@components/organisms/thread/ThreadEditModal'
import useCurrentMember from '@hooks/useCurrentMember'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'

interface Props {
  circleId?: string
}

export default function MeetingActions({ circleId }: Props) {
  const { t } = useTranslation()
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
        {t('MeetingActions.createTask')}
      </Button>

      <Button size="sm" leftIcon={<FiPlus />} onClick={onCreateThreadOpen}>
        {t('MeetingActions.createThread')}
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
