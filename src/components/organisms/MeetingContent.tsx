import {
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
  Flex,
  Heading,
  HStack,
  IconButton,
  StackItem,
  Tag,
  useDisclosure,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import Loading from '@components/atoms/Loading'
import MemberLink from '@components/atoms/MemberLink'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import TextErrors from '@components/atoms/TextErrors'
import MeetingStepContent from '@components/molecules/MeetingStepContent'
import MeetingStepLayout from '@components/molecules/MeetingStepLayout'
import useCircle from '@hooks/useCircle'
import useCurrentMember from '@hooks/useCurrentMember'
import useParticipants from '@hooks/useParticipants'
import useSubscription from '@hooks/useSubscription'
import { format } from 'date-fns'
import React, { useCallback } from 'react'
import { FaStop } from 'react-icons/fa'
import {
  FiArrowDown,
  FiCalendar,
  FiClock,
  FiEdit3,
  FiPlay,
} from 'react-icons/fi'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'
import MeetingEditModal from './modals/MeetingEditModal'

interface Props extends BoxProps {
  id: string
}

export default function MeetingContent({ id, ...boxProps }: Props) {
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
  const canEditConfig = isNotStarted && (isParticipant || isInitiator)

  // Circle
  const circle = useCircle(meeting?.circleId)

  // Meeting edition modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Go to step
  const handleGoToStep = (stepId: string) => {
    if (!meeting) return
    updateMeeting(meeting.id, {
      currentStepId: stepId,
    })
  }

  // Next step
  const handleNextStep = useCallback(() => {
    if (!meeting) return
    goToNextMeetingStep(meeting)
  }, [meeting])

  return (
    <Box {...boxProps}>
      <Flex alignItems="center">
        <Heading as="h1" size="md" display="flex" alignItems="center">
          Réunion : {meeting?.title}
        </Heading>

        {canEditConfig && (
          <IconButton
            aria-label=""
            icon={<FiEdit3 />}
            variant="ghost"
            size="sm"
            ml={2}
            onClick={onEditOpen}
          />
        )}

        {circle && <CircleButton circle={circle} modal ml={5} />}

        <ParticipantsNumber participants={participants} ml={1} />
      </Flex>

      {(loading || stepsLoading) && <Loading active size="md" />}
      <TextErrors errors={[error, stepsError]} />

      {meeting && (
        <>
          <HStack my={3} spacing={2}>
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
                <AlertDescription>Vous animez cette réunion.</AlertDescription>
              </Alert>

              {meeting.currentStepId === null && (
                <Button
                  leftIcon={<FiPlay />}
                  colorScheme="green"
                  mb={5}
                  onClick={handleNextStep}
                >
                  Démarrer
                </Button>
              )}
            </>
          ) : facilitator ? (
            <>
              {!isParticipant && (
                <Alert status="info" mb={5}>
                  <AlertIcon />
                  <AlertDescription>
                    Vous n'êtes pas participant dans cette réunion, vous ne
                    pouvez donc pas la modifier.
                  </AlertDescription>
                </Alert>
              )}
              <MemberLink member={facilitator.member} /> anime cette réunion.
            </>
          ) : null}

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
                    !meeting.ended && isFacilitator
                      ? () => handleGoToStep(stepConfig.id)
                      : undefined
                  }
                >
                  {step && (
                    <MeetingStepContent
                      meetingId={id}
                      editable={isParticipant && !meeting.ended}
                      current={current}
                      stepConfig={stepConfig}
                      step={step}
                    />
                  )}

                  {isFacilitator && current && (
                    <Button
                      leftIcon={last ? <FaStop /> : <FiArrowDown />}
                      colorScheme={'green'}
                      mt={5}
                      onClick={handleNextStep}
                    >
                      {last ? 'Terminer' : 'Suivant'}
                    </Button>
                  )}
                </MeetingStepLayout>
              )
            })}
          </Box>
        </>
      )}

      {isEditOpen && (
        <MeetingEditModal meeting={meeting} isOpen onClose={onEditClose} />
      )}
    </Box>
  )
}
