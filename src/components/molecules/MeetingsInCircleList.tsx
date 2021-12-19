import {
  Button,
  LinkBox,
  LinkOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import MeetingModal from '@components/organisms/modals/MeetingModal'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'
import useMeetingsList, { MeetingsFilter } from '../../hooks/useMeetingsList'

interface Props {
  circleId: string
}

export default function MeetingsInCircleList({ circleId }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Subscribe to meetings
  const { meetings, error, loading } = useMeetingsList(
    MeetingsFilter.Circle,
    false,
    circleId
  )

  // Meeting modal
  const {
    isOpen: isMeetingOpen,
    onOpen: onMeetingOpen,
    onClose: onMeetingClose,
  } = useDisclosure()

  return (
    <>
      <Button size="sm" mb={2} leftIcon={<FiPlus />} onClick={onMeetingOpen}>
        Créer une réunion
      </Button>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {meetings && (
        <VStack spacing={0} align="stretch">
          {meetings.length === 0 && <i>Aucune réunion pour le moment</i>}

          {meetings.map((meeting) => (
            <LinkBox
              key={meeting.id}
              px={2}
              py={1}
              borderBottomWidth="1px"
              _hover={{ background: '#fafafa' }}
            >
              <LinkOverlay
                as={ReachLink}
                to={`/orgs/${orgId}/meetings/${meeting.id}`}
              >
                {meeting.title}
              </LinkOverlay>
            </LinkBox>
          ))}
        </VStack>
      )}

      {isMeetingOpen && (
        <MeetingModal
          defaultCircleId={circleId}
          isOpen
          onClose={onMeetingClose}
        />
      )}
    </>
  )
}
