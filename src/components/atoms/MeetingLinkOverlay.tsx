import { LinkOverlay, LinkOverlayProps, useDisclosure } from '@chakra-ui/react'
import MeetingModal from '@components/organisms/modals/MeetingModal'
import { MeetingEntry } from '@shared/meeting'
import { useStoreState } from '@store/hooks'
import { format } from 'date-fns'
import React, { MouseEvent, useCallback } from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { dateFnsLocale } from 'src/locale'

interface Props extends LinkOverlayProps {
  meeting: MeetingEntry
}

export default function MeetingLinkOverlay({
  meeting,
  ...linkOverlayProps
}: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const date = meeting.startDate.toDate()

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
        to={`/orgs/${orgId}/meetings/${meeting.id}`}
        onClick={handleOpen}
        {...linkOverlayProps}
      >
        {format(date, 'p ', {
          locale: dateFnsLocale,
        })}{' '}
        - {meeting.title}
      </LinkOverlay>

      {isOpen && <MeetingModal id={meeting.id} isOpen onClose={onClose} />}
    </>
  )
}
