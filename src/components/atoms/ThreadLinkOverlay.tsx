import { LinkOverlay, LinkOverlayProps, useDisclosure } from '@chakra-ui/react'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React, { MouseEvent, useCallback } from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkOverlayProps {
  thread: ThreadEntry
}

export default function ThreadLinkOverlay({
  thread,
  ...linkOverlayProps
}: Props) {
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
        to={`/orgs/${orgId}/threads/${thread.id}`}
        onClick={handleOpen}
        {...linkOverlayProps}
      >
        {thread.title}
      </LinkOverlay>

      {isOpen && <ThreadModal id={thread.id} isOpen onClose={onClose} />}
    </>
  )
}
