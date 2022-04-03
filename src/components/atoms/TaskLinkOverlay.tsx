import { LinkOverlay, LinkOverlayProps, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@components/organisms/modals/TaskModal'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useOrgId } from '@hooks/useOrgId'
import { TaskEntry } from '@shared/task'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkOverlayProps {
  task: TaskEntry
}

export default function TaskLinkOverlay({ task, ...linkOverlayProps }: Props) {
  const orgId = useOrgId()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)

  return (
    <>
      <LinkOverlay
        as={ReachLink}
        flex={1}
        to={`/orgs/${orgId}/tasks/${task.id}`}
        onClick={handleOpen}
        {...linkOverlayProps}
      >
        {task.title}
      </LinkOverlay>

      {isOpen && <TaskModal id={task.id} isOpen onClose={onClose} />}
    </>
  )
}
