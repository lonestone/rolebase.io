import { subscribeMeetingsByCircle } from '@api/entities/meetings'
import {
  Button,
  Center,
  Flex,
  LinkBox,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import MeetingLinkOverlay from '@components/atoms/MeetingLinkOverlay'
import TextErrors from '@components/atoms/TextErrors'
import MeetingEditModal from '@components/organisms/modals/MeetingEditModal'
import MeetingModal from '@components/organisms/modals/MeetingModal'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import { format, isSameDay } from 'date-fns'
import React, { useState } from 'react'
import { FiCalendar, FiPlus } from 'react-icons/fi'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'

interface Props {
  circleId: string
}

export default function MeetingsInCircleList({ circleId }: Props) {
  const orgId = useOrgId()
  const hover = useHoverItemStyle()

  const {
    data: meetings,
    error,
    loading,
  } = useSubscription(
    orgId ? subscribeMeetingsByCircle(orgId, circleId) : undefined
  )

  // Meeting modal
  const [meetingId, setMeetingId] = useState<string | undefined>()
  const {
    isOpen: isMeetingOpen,
    onOpen: onMeetingOpen,
    onClose: onMeetingClose,
  } = useDisclosure()

  // Create Meeting modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  const handleCreate = (id: string) => {
    setMeetingId(id)
    onMeetingOpen()
  }

  return (
    <>
      <Button size="sm" mb={4} leftIcon={<FiPlus />} onClick={onCreateOpen}>
        Créer une réunion
      </Button>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {meetings?.length === 0 && <Text>Aucune réunion pour le moment</Text>}

      {meetings?.map((meeting, i) => {
        const date = meeting.startDate.toDate()
        return (
          <React.Fragment key={meeting.id}>
            {(i === 0 ||
              !isSameDay(date, meetings[i - 1].startDate.toDate())) && (
              <Text mt={2} px={2} fontSize="sm">
                {capitalizeFirstLetter(
                  format(date, 'PPPP ', {
                    locale: dateFnsLocale,
                  })
                )}
              </Text>
            )}

            <LinkBox px={2} py={1} _hover={hover}>
              <Flex>
                <Center w={6} h={6} mr={2}>
                  <FiCalendar />
                </Center>

                <MeetingLinkOverlay meeting={meeting} />
              </Flex>
            </LinkBox>
          </React.Fragment>
        )
      })}

      {isMeetingOpen && meetingId && (
        <MeetingModal id={meetingId} isOpen onClose={onMeetingClose} />
      )}

      {isCreateOpen && (
        <MeetingEditModal
          defaultCircleId={circleId}
          isOpen
          onClose={onCreateClose}
          onCreate={handleCreate}
        />
      )}
    </>
  )
}
