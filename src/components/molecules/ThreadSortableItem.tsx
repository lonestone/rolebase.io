import { subscribeThread } from '@api/entities/threads'
import { CloseIcon } from '@chakra-ui/icons'
import { IconButton, Tooltip } from '@chakra-ui/react'
import useSortableItem from '@hooks/useSortableItem'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const { data: thread } = useSubscription(subscribeThread(threadId))
  const { attributes, listeners } = useSortableItem(threadId, disabled)

  if (!thread) return null
  return (
    <ThreadItem key={threadId} thread={thread} {...attributes} {...listeners}>
      {onRemove && (
        <Tooltip label={t('common.remove')} placement="top" hasArrow>
          <IconButton
            aria-label={t('common.remove')}
            size="xs"
            variant="ghost"
            icon={<CloseIcon />}
            ml={2}
            zIndex={1}
            onClick={() => onRemove(threadId)}
          />
        </Tooltip>
      )}
    </ThreadItem>
  )
}
