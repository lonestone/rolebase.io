import { subscribeLogsByMeeting } from '@api/entities/logs'
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
  Collapse,
  Flex,
  Heading,
  HStack,
  IconButton,
  StackItem,
  Tag,
  Text,
  useDisclosure,
  VStack,
  useColorMode,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import Loading from '@components/atoms/Loading'
import MemberLink from '@components/atoms/MemberLink'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import MeetingStepContent from '@components/molecules/MeetingStepContent'
import MeetingStepLayout from '@components/molecules/MeetingStepLayout'
import TaskModal from '@components/organisms/modals/TaskModal'
import useCircle from '@hooks/useCircle'
import useCurrentMember from '@hooks/useCurrentMember'
import useParticipants from '@hooks/useParticipants'
import useSubscription from '@hooks/useSubscription'
import { format } from 'date-fns'
import React, { useCallback } from 'react'
import { useStoreState } from '@store/hooks'
import { FaStop } from 'react-icons/fa'
import {
  FiArrowDown,
  FiCalendar,
  FiClock,
  FiEdit3,
  FiPlay,
  FiTrash2,
  FiVideo,
  FiPlus,
} from 'react-icons/fi'
import slugify from 'slugify'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'
import MeetingDeleteModal from './modals/MeetingDeleteModal'
import MeetingEditModal from './modals/MeetingEditModal'
import LogCancelText from '@components/molecules/LogCancelText'
import LogText from '@components/molecules/LogText'

interface Props extends BoxProps {
  id: string
  changeTitle?: boolean
  onClose(): void
}

export default function MeetingContent({
  id,
  onClose,
  changeTitle,
  ...boxProps
}: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const currentMember = useCurrentMember()
  const { colorMode } = useColorMode()
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

  const subscribeLogs =
    orgId && id ? subscribeLogsByMeeting(orgId, id) : undefined
  const {
    data: logs,
    loading: logsLoading,
    error: logsError,
  } = useSubscription(subscribeLogs)
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
  const canEditConfig = isNotStarted && (isParticipant || isInitiator)

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

  // Task Creation modal
  const {
    isOpen: isCreateTaskOpen,
    onOpen: onCreateTaskOpen,
    onClose: onCreateTaskClose,
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
    goToNextMeetingStep(meeting, participants)
  }, [meeting])

  // Join video conference
  const handleJoinVideoConf = useCallback(() => {
    if (!meeting || !circle || !currentMember || !circle) return

    const roomName = `${meeting.title} Cercle ${circle.role.name} ${format(
      meeting.startDate.toDate(),
      'Pp',
      {
        locale: dateFnsLocale,
      }
    )}`
    const url = `https://meet.jit.si/${slugify(roomName, {
      strict: true,
    })}#userInfo.displayName="${encodeURIComponent(
      currentMember.name
    )}"&interfaceConfig.SHOW_CHROME_EXTENSION_BANNER=false`

    window.open(url, '_blank')
  }, [meeting, circle, currentMember])

  return (
    <Box {...boxProps}>
      {changeTitle && <Title>{`Réunion : ${meeting?.title}`}</Title>}

      <Flex alignItems="center" flexWrap="wrap" mb={3} pr="8rem">
        <Heading as="h1" size="md">
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

        {canDelete && (
          <IconButton
            aria-label=""
            icon={<FiTrash2 />}
            variant="ghost"
            size="sm"
            onClick={onDeleteOpen}
          />
        )}

        {circle && <CircleButton circle={circle} ml={5} />}

        <ParticipantsNumber participants={participants} ml={1} />
      </Flex>

      {(loading || stepsLoading || logsLoading) && <Loading active size="md" />}
      <TextErrors errors={[error, stepsError, logsError]} />

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

            {isStarted && isParticipant && (
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
                      editable={isParticipant && !meeting.ended}
                      current={current}
                      stepConfig={stepConfig}
                      step={step}
                    />
                  )}

                  {isFacilitator && (
                    <Collapse in={current} animateOpacity>
                      <Button
                        leftIcon={last ? <FaStop /> : <FiArrowDown />}
                        colorScheme={'green'}
                        mt={5}
                        onClick={handleNextStep}
                      >
                        {last ? 'Terminer' : 'Suivant'}
                      </Button>
                    </Collapse>
                  )}
                </MeetingStepLayout>
              )
            })}

            <Button
              size="sm"
              ml={1}
              leftIcon={<FiPlus />}
              onClick={onCreateTaskOpen}
            >
              Nouvelle tâche
            </Button>

            {logs ? (
              <>
                <Heading as="h2" size="md" mt="6" mb="4">
                  Historique
                </Heading>
                {logs.map((log) => (
                  <>
                    <HStack
                      key={log.id}
                      py={3}
                      alignItems="top"
                      borderBottom="1px solid"
                      borderBottomColor={
                        colorMode === 'light' ? 'gray.200' : 'gray.550'
                      }
                    >
                      <StackItem>
                        <Text
                          textDecoration={
                            log.canceled ? 'line-through' : undefined
                          }
                        >
                          <LogCancelText log={log} />
                          <LogText log={log} />
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {capitalizeFirstLetter(
                            format(log.createdAt.toDate(), 'PPpp ', {
                              locale: dateFnsLocale,
                            })
                          )}
                        </Text>
                      </StackItem>
                    </HStack>
                  </>
                ))}
              </>
            ) : null}
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
      {isCreateTaskOpen && (
        <TaskModal
          isOpen
          defaultMemberId={currentMember?.id}
          onClose={onCreateTaskClose}
        />
      )}
    </Box>
  )
}
