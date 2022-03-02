import { CloseIcon } from '@chakra-ui/icons'
import { HStack, IconButton, LinkBox } from '@chakra-ui/react'
import ThreadLinkOverlay from '@components/atoms/ThreadLinkOverlay'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import useSortableItem from '@hooks/useSortableItem'
import { ThreadEntry } from '@shared/thread'
import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'

interface Props {
  thread: ThreadEntry
  onRemove?(threadId: string): void
  disabled: boolean
}

export default function ThreadSortableItem({
  thread,
  onRemove,
  disabled,
}: Props) {
  const hover = useHoverItemStyle()
  const { attributes, listeners } = useSortableItem(thread.id, disabled)

  return (
    <LinkBox
      key={thread.id}
      px={2}
      py={1}
      _hover={hover}
      {...attributes}
      {...listeners}
    >
      <HStack spacing={3} align="stretch" alignItems="center">
        <FiMessageSquare />
        <ThreadLinkOverlay thread={thread} />

        {onRemove && (
          <IconButton
            aria-label=""
            size="sm"
            icon={<CloseIcon />}
            onClick={() => onRemove(thread.id)}
          />
        )}
      </HStack>
    </LinkBox>
  )
}
