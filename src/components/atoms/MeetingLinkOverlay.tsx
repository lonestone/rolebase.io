import { LinkOverlay, LinkOverlayProps, useDisclosure } from '@chakra-ui/react'
import MeetingModal from '@components/organisms/modals/MeetingModal'
import useDateLocale from '@hooks/useDateLocale'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useOrgId } from '@hooks/useOrgId'
import { MeetingEntry } from '@shared/model/meeting'
import { format } from 'date-fns'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkOverlayProps {
  meeting: MeetingEntry
}

export default function MeetingLinkOverlay({
  meeting,
  ...linkOverlayProps
}: Props) {
  const orgId = useOrgId()
  const dateLocale = useDateLocale()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)
  const date = meeting.startDate.toDate()

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
          locale: dateLocale,
        })}{' '}
        - {meeting.title}
      </LinkOverlay>

      {isOpen && <MeetingModal id={meeting.id} isOpen onClose={onClose} />}
    </>
  )
}
