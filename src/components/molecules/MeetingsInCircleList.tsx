import { subscribeMeetingsByCircle } from '@api/entities/meetings'
import {
  Button,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import MeetingModal from '@components/organisms/modals/MeetingModal'
import useSubscription from '@hooks/useSubscription'
import { useStoreState } from '@store/hooks'
import { format } from 'date-fns'
import React from 'react'
import { FiCalendar, FiPlus } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'

interface Props {
  circleId: string
}

export default function MeetingsInCircleList({ circleId }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  const {
    data: meetings,
    error,
    loading,
  } = useSubscription(
    orgId ? subscribeMeetingsByCircle(orgId, circleId, false) : undefined
  )

  // Meeting modal
  const {
    isOpen: isMeetingOpen,
    onOpen: onMeetingOpen,
    onClose: onMeetingClose,
  } = useDisclosure()

  return (
    <>
      <Button size="sm" mb={4} leftIcon={<FiPlus />} onClick={onMeetingOpen}>
        Créer une réunion
      </Button>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {meetings && (
        <VStack spacing={0} align="stretch">
          {meetings.length === 0 && <i>Aucune réunion pour le moment</i>}

          {meetings.map((meeting, i) => {
            const date = meeting.startDate.toDate()
            return (
              <React.Fragment key={meeting.id}>
                {(i === 0 ||
                  date.getDay() !==
                    meetings[i - 1].startDate.toDate().getDay()) && (
                  <Text px={2} fontSize="sm">
                    {capitalizeFirstLetter(
                      format(date, 'PPPP ', {
                        locale: dateFnsLocale,
                      })
                    )}
                  </Text>
                )}

                <LinkBox
                  key={meeting.id}
                  px={2}
                  py={1}
                  borderBottomWidth="1px"
                  _hover={{ background: '#fafafa' }}
                >
                  <HStack spacing={3} align="stretch" alignItems="center">
                    <FiCalendar />
                    <LinkOverlay
                      as={ReachLink}
                      to={`/orgs/${orgId}/meetings/${meeting.id}`}
                    >
                      {format(date, 'p ', {
                        locale: dateFnsLocale,
                      })}{' '}
                      - {meeting.title}
                    </LinkOverlay>
                  </HStack>
                </LinkBox>
              </React.Fragment>
            )
          })}
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
