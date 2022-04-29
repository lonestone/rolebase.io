import { subscribeThread } from '@api/entities/threads'
import { CloseIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useSortableItem from '@hooks/useSortableItem'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import ThreadItem from './ThreadItem'

interface Props {
  threadId: string
  disabled: boolean
  onRemove?(threadId: string): void
}

export default function ThreadSortableItem({
  threadId,
  onRemove,
  disabled,
}: Props) {
  const { data: thread } = useSubscription(subscribeThread(threadId))
  const { attributes, listeners } = useSortableItem(threadId, disabled)

  if (!thread) return null
  return (
    <ThreadItem key={threadId} thread={thread} {...attributes} {...listeners}>
      {onRemove && (
        <IconButton
          aria-label=""
          size="xs"
          variant="ghost"
          icon={<CloseIcon />}
          ml={2}
          zIndex={1}
          onClick={() => onRemove(threadId)}
        />
      )}
    </ThreadItem>
  )
}
