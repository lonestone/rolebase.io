import { CloseIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useSortableItem from '@hooks/useSortableItem'
import { ThreadEntry } from '@shared/thread'
import React from 'react'
import ThreadItem from './ThreadItem'

interface Props {
  thread: ThreadEntry
  disabled: boolean
  onRemove?(threadId: string): void
}

export default function ThreadSortableItem({
  thread,
  onRemove,
  disabled,
}: Props) {
  const { attributes, listeners } = useSortableItem(thread.id, disabled)

  return (
    <ThreadItem key={thread.id} thread={thread} {...attributes} {...listeners}>
      {onRemove && (
        <IconButton
          aria-label=""
          size="xs"
          variant="ghost"
          icon={<CloseIcon />}
          ml={2}
          zIndex={1}
          onClick={() => onRemove(thread.id)}
        />
      )}
    </ThreadItem>
  )
}
