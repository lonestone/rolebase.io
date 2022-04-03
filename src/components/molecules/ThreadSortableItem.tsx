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
  disabled: boolean
  onRemove?(threadId: string): void
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
      pr={1}
      py={1}
      _hover={hover}
      {...attributes}
      {...listeners}
      tabIndex={
        // Remove tabIndex because it's redondant with link
        undefined
      }
    >
      <HStack>
        <FiMessageSquare />
        <ThreadLinkOverlay thread={thread} />

        {onRemove && (
          <IconButton
            aria-label=""
            size="xs"
            variant="ghost"
            icon={<CloseIcon />}
            zIndex={1}
            onClick={() => onRemove(thread.id)}
          />
        )}
      </HStack>
    </LinkBox>
  )
}
