import { subscribeThread } from '@api/entities/threads'
import { CloseIcon } from '@chakra-ui/icons'
import IconTextButton from '@components/atoms/IconTextButton'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import ThreadItem from './ThreadItem'

interface Props {
  threadId: string
  index: number
  onRemove?(threadId: string): void
}

export default function ThreadSortableItem({
  threadId,
  index,
  onRemove,
}: Props) {
  const { t } = useTranslation()
  const { data: thread } = useSubscription(subscribeThread(threadId))

  if (!thread) return null
  return (
    <Draggable draggableId={threadId} index={index}>
      {(provided, snapshot) => (
        <ThreadItem
          ref={provided.innerRef}
          thread={thread}
          showIcon
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {onRemove && (
            <IconTextButton
              aria-label={t('common.remove')}
              size="xs"
              variant="ghost"
              icon={<CloseIcon />}
              ml={2}
              zIndex={1}
              onClick={() => onRemove(threadId)}
            />
          )}
        </ThreadItem>
      )}
    </Draggable>
  )
}
