import {
  endMeeting,
  goToNextMeetingStep,
  subscribeMeeting,
  updateMeeting,
} from '@api/entities/meetings'
import { meetingStepsEntities } from '@api/entities/meetingSteps'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  BoxProps,
  Button,
  Collapse,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  StackItem,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import Loading from '@components/atoms/Loading'
import MemberLink from '@components/atoms/MemberLink'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import ActionsMenu from '@components/molecules/ActionsMenu'
import MeetingActions from '@components/molecules/MeetingActions'
import MeetingLogs from '@components/molecules/MeetingLogs'
import MeetingStepContent from '@components/molecules/MeetingStepContent'
import MeetingStepLayout from '@components/molecules/MeetingStepLayout'
import useCircle from '@hooks/useCircle'
import useCurrentMember from '@hooks/useCurrentMember'
import useParticipants from '@hooks/useParticipants'
import useSubscription from '@hooks/useSubscription'
import generateVideoConfUrl from '@shared/helpers/generateVideoConfUrl'
import { format } from 'date-fns'
import React, { useCallback } from 'react'
import { FaStop } from 'react-icons/fa'
import {
  FiArrowDown,
  FiCalendar,
  FiClock,
  FiPlay,
  FiVideo,
} from 'react-icons/fi'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'
import MeetingDeleteModal from './modals/MeetingDeleteModal'
import MeetingEditModal from './modals/MeetingEditModal'
interface Props extends BoxProps {
  id: string
  changeTitle?: boolean
  headerIcons?: React.ReactNode
  onClose(): void
}

export default function MeetingContent({
  id,
  onClose,
  changeTitle,
  headerIcons,
  ...boxProps
}: Props) {
  const currentMember = useCurrentMember()

  // Subscribe meeting
  const {
    data: meeting,
    loading,
    error,
  } = useSubscription(subscribeMeeting(id))

  // Subscribe meeting steps
  const { subscribeMeetingSteps } = meetingStepsEntities(id)
  const {
    data: steps,
    error: stepsError,
    loading: stepsLoading,
  } = useSubscription(subscribeMeetingSteps())

  // Meeting not started?
  const isNotStarted = !meeting?.ended && meeting?.currentStepId === null
  const isStarted = !meeting?.ended && meeting?.currentStepId !== null

  // Participants
  const participants = useParticipants(
    meeting?.circleId,
    meeting?.participantsScope,
    meeting?.participantsMembersIds
  )

  // Is current member participant? facilitator?
  const isParticipant = currentMember
    ? participants.some((p) => p.member.id === currentMember.id)
    : false
  const isFacilitator = currentMember?.id === meeting?.facilitatorMemberId
  const isInitiator = currentMember?.id === meeting?.initiatorMemberId
  const facilitator = participants?.find(
    (p) => p.member.id === meeting?.facilitatorMemberId
  )
  const canDelete = meeting && !meeting.ended && (isParticipant || isInitiator)
  const canEditConfig = canDelete

  // Circle
  const circle = useCircle(meeting?.circleId)

  // Meeting edition modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Meeting deletion modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  // Go to step
  const handleGoToStep = (stepId: string) => {
    if (!meeting) return
    updateMeeting(meeting.id, {
      currentStepId: stepId,
    })
  }

  // End meeting
  const handleEnd = useCallback(() => {
    if (!meeting) return
    endMeeting(
      meeting.id,
      participants.map((p) => p.member.id)
    )
  }, [meeting, participants])

  // Next step
  const handleNextStep = useCallback(() => {
    if (!meeting) return
    goToNextMeetingStep(
      meeting,
      participants.map((p) => p.member.id)
    )
  }, [meeting, participants])

  // Join video conference
  const handleJoinVideoConf = useCallback(() => {
    if (!meeting?.videoConf || !circle || !currentMember) return
    const url =
      typeof meeting.videoConf === 'string'
        ? meeting.videoConf
        : generateVideoConfUrl(meeting, circle, currentMember)
    window.open(url, '_blank')
  }, [meeting, circle, currentMember])

  return (
    <Box {...boxProps}>
      {changeTitle && <Title>{`Réunion : ${meeting?.title}`}</Title>}

      <Flex mb={3}>
        <Heading as="h1" size="md">
          Réunion : {meeting?.title}
        </Heading>

        <Spacer />

        <Flex mr={headerIcons ? -2 : 0}>
          {circle && <CircleButton circle={circle} mr={1} />}

          <ParticipantsNumber participants={participants} mr={1} />

          {(canEditConfig || canDelete) && (
            <ActionsMenu
              onEdit={canEditConfig ? onEditOpen : undefined}
              onDelete={canDelete ? onDeleteOpen : undefined}
            />
          )}

          {headerIcons}
        </Flex>
      </Flex>

      {(loading || stepsLoading) && <Loading active size="md" />}
      <TextErrors errors={[error, stepsError]} />

      {meeting && (
        <>
          <VStack spacing={5} align="start">
            <HStack spacing={2}>
              <FiCalendar />
              <StackItem>
                {capitalizeFirstLetter(
                  format(meeting.startDate.toDate(), 'PPPP', {
                    locale: dateFnsLocale,
                  })
                )}
              </StackItem>
              <FiClock />
              <StackItem>
                {format(meeting.startDate.toDate(), 'p', {
                  locale: dateFnsLocale,
                })}
                {' - '}
                {format(meeting.endDate.toDate(), 'p', {
                  locale: dateFnsLocale,
                })}
              </StackItem>
              {meeting?.ended && <Tag ml={1}>Terminée</Tag>}
            </HStack>

            {meeting.ended ? (
              <>
                {isFacilitator && (
                  <Button leftIcon={<FiPlay />} onClick={handleNextStep}>
                    Reprendre la réunion
                  </Button>
                )}
              </>
            ) : isFacilitator ? (
              <>
                <Alert status="info">
                  <AlertIcon />
                  <AlertDescription>
                    Vous animez cette réunion.
                  </AlertDescription>
                </Alert>

                {isNotStarted && (
                  <Button
                    leftIcon={<FiPlay />}
                    colorScheme="green"
                    onClick={handleNextStep}
                  >
                    Démarrer
                  </Button>
                )}
              </>
            ) : (
              <>
                {!isParticipant && (
                  <Alert status="info">
                    <AlertIcon />
                    <AlertDescription>
                      Vous n'êtes pas participant dans cette réunion, vous ne
                      pouvez donc pas la rejoindre.
                    </AlertDescription>
                  </Alert>
                )}
                {facilitator && (
                  <Text>
                    <MemberLink
                      id={facilitator.member.id}
                      name={facilitator.member.name}
                    />{' '}
                    anime cette réunion.
                  </Text>
                )}
              </>
            )}

            {isStarted && isParticipant && meeting.videoConf && (
              <Button
                leftIcon={<FiVideo />}
                colorScheme="blue"
                onClick={handleJoinVideoConf}
              >
                Rejoindre la visio
              </Button>
            )}
          </VStack>

          <Box mt={10}>
            {meeting.stepsConfig.map((stepConfig, index) => {
              const last = index === meeting.stepsConfig.length - 1
              const step = steps?.find((s) => s.id === stepConfig.id)
              const current = meeting.currentStepId === stepConfig.id

              return (
                <MeetingStepLayout
                  key={stepConfig.id}
                  index={index}
                  title={stepConfig.title}
                  last={last}
                  current={current}
                  onNumberClick={
                    isStarted && isFacilitator
                      ? () => handleGoToStep(stepConfig.id)
                      : undefined
                  }
                >
                  {step && (
                    <MeetingStepContent
                      meetingId={id}
                      circleId={meeting.circleId}
                      editable={isParticipant && !meeting.ended}
                      current={current}
                      stepConfig={stepConfig}
                      step={step}
                    />
                  )}

                  {isStarted && isFacilitator && (
                    <Collapse in={current || last} animateOpacity>
                      <Button
                        leftIcon={last ? <FaStop /> : <FiArrowDown />}
                        colorScheme={current ? 'green' : 'gray'}
                        mt={5}
                        onClick={last ? handleEnd : handleNextStep}
                      >
                        {last ? 'Terminer la réunion' : 'Étape suivante'}
                      </Button>
                    </Collapse>
                  )}
                </MeetingStepLayout>
              )
            })}

            {isStarted && <MeetingActions circleId={meeting.circleId} />}

            {!isNotStarted && (
              <Container size="xs" mt={10}>
                <MeetingLogs meetingId={meeting.id} />
              </Container>
            )}
          </Box>
        </>
      )}

      {isEditOpen && (
        <MeetingEditModal meeting={meeting} isOpen onClose={onEditClose} />
      )}

      {isDeleteOpen && meeting && (
        <MeetingDeleteModal
          meeting={meeting}
          isOpen
          onClose={onDeleteClose}
          onDelete={onClose}
        />
      )}
    </Box>
  )
}
