import { LinkOverlay, LinkOverlayProps, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@components/organisms/modals/TaskModal'
import { TaskEntry } from '@shared/task'
import { useStoreState } from '@store/hooks'
import React, { MouseEvent, useCallback } from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkOverlayProps {
  task: TaskEntry
}

export default function TaskLinkOverlay({ task, ...linkOverlayProps }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    // Normal click (not Ctrl+click or Cmd+click)
    if (!(event.ctrlKey || event.metaKey)) {
      // Prevent default link behavior
      event.preventDefault()
      // Open modal
      onOpen()
    }
  }, [])

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
