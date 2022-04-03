import { LinkOverlay, LinkOverlayProps, useDisclosure } from '@chakra-ui/react'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useOrgId } from '@hooks/useOrgId'
import { ThreadEntry } from '@shared/thread'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkOverlayProps {
  thread: ThreadEntry
}

export default function ThreadLinkOverlay({
  thread,
  ...linkOverlayProps
}: Props) {
  const orgId = useOrgId()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)

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
