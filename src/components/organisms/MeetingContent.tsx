import {
  endMeeting,
  goToNextMeetingStep,
  subscribeMeeting,
  updateMeeting,
} from '@api/entities/meetings'
import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { stopMembersMeeting } from '@api/entities/members'
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
  Tag,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import Loading from '@components/atoms/Loading'
import MemberLink from '@components/atoms/MemberLink'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import ActionsMenu from '@components/molecules/ActionsMenu'
import MeetingActions from '@components/molecules/MeetingActions'
import MeetingAttendees from '@components/molecules/MeetingAttendees'
import MeetingLogs from '@components/molecules/MeetingLogs'
import MeetingStepContent from '@components/molecules/MeetingStepContent'
import { taskLogTypes } from '@components/molecules/MeetingStepContentTasks'
import MeetingStepLayout from '@components/molecules/MeetingStepLayout'
import useAdmin from '@hooks/useAdmin'
import useCircle from '@hooks/useCircle'
import useCurrentMember from '@hooks/useCurrentMember'
import useDateLocale from '@hooks/useDateLocale'
import useParticipants from '@hooks/useParticipants'
import useSubscription from '@hooks/useSubscription'
import generateVideoConfUrl from '@shared/helpers/generateVideoConfUrl'
import { ParticipantMember } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import { format } from 'date-fns'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FaStop } from 'react-icons/fa'
import {
  FiArrowDown,
  FiCalendar,
  FiClock,
  FiPlay,
  FiVideo,
  FiX,
} from 'react-icons/fi'
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
  const { t } = useTranslation()
  const dateLocale = useDateLocale()
  const currentMember = useCurrentMember()
  const isAdmin = useAdmin()
  const members = useStoreState((state) => state.members.entries)

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

  // Edit mode when meeting is ended
  const [forceEdit, setForceEdit] = useState(false)

  // Meeting not started?
  const isNotStarted = !meeting?.ended && meeting?.currentStepId === null
  const isStarted = !meeting?.ended && meeting?.currentStepId !== null

  // Participants
  const initialParticipants = useParticipants(
    meeting?.circleId,
    meeting?.participantsScope,
    meeting?.participantsMembersIds
  )

  const attendeesParticipants: ParticipantMember[] = useMemo(
    () =>
      (meeting?.attendees
        ?.map(({ memberId, circlesIds }) => {
          const member = members?.find((m) => m.id === memberId)
          if (!member) return
          return { member, circlesIds }
        })
        .filter(Boolean) as ParticipantMember[]) || [],
    [meeting, members]
  )

  // If attendees are set, take them instead of initial participants
  const participants = meeting?.attendees
    ? attendeesParticipants
    : initialParticipants

  // Is current member participant? facilitator?
  const isParticipant = currentMember
    ? participants.some((p) => p.member.id === currentMember.id)
    : false
  const isFacilitator = currentMember?.id === meeting?.facilitatorMemberId
  const isInitiator = currentMember?.id === meeting?.initiatorMemberId
  const facilitator = participants?.find(
    (p) => p.member.id === meeting?.facilitatorMemberId
  )
  const canEdit = isParticipant || isInitiator || isAdmin

  // Fix current meeting for current member if meeting is not started
  useEffect(() => {
    if (!isStarted && currentMember?.meetingId === meeting.id) {
      stopMembersMeeting([currentMember.id], meeting.id)
    }
  }, [isStarted, currentMember, meeting])

  // Reset forced edition when meeting is not ended anymore
  useEffect(() => {
    if (forceEdit && !meeting?.ended) {
      setForceEdit(false)
    }
  }, [meeting?.ended, forceEdit])

  // Circle
  const circle = useCircle(meeting?.circleId)

  // Meeting edition modal
  const [duplicateInModal, setDuplicateInModal] = useState(false)
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const handleEdit = () => {
    setDuplicateInModal(false)
    onEditOpen()
  }

  const handleDuplicate = () => {
    setDuplicateInModal(true)
    onEditOpen()
  }

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
    goToNextMeetingStep(meeting, participants)
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
      {changeTitle && (
        <Title>
          {t('organisms.MeetingContent.title', {
            circle: circle?.role.name || '',
            title: meeting?.title || '…',
          })}
        </Title>
      )}

      <Flex mb={3}>
        <Heading as="h1" size="md">
          <Trans
            i18nKey="organisms.MeetingContent.heading"
            values={{ title: meeting?.title || '…' }}
            components={{
              circle: circle ? <CircleButton circle={circle} mx={1} /> : <></>,
            }}
          />
        </Heading>

        <Spacer />

        <Flex mr={headerIcons ? -2 : 0}>
          <ParticipantsNumber participants={participants} mr={1} />

          <ActionsMenu
            onEdit={
              canEdit
                ? meeting?.ended && !forceEdit
                  ? () => setForceEdit(true)
                  : handleEdit
                : undefined
            }
            onDuplicate={handleDuplicate}
            onDelete={canEdit && !isStarted ? onDeleteOpen : undefined}
          />

          {headerIcons}
        </Flex>
      </Flex>

      {meeting && (
        <>
          <VStack spacing={5} align="start">
            <Wrap spacing={5} align="center">
              <Wrap spacing={3} align="center">
                <FiCalendar />
                {capitalizeFirstLetter(
                  format(meeting.startDate.toDate(), 'PPPP', {
                    locale: dateLocale,
                  })
                )}
              </Wrap>
              <Wrap spacing={3} align="center">
                <FiClock />
                {format(meeting.startDate.toDate(), 'p', {
                  locale: dateLocale,
                })}
                {' - '}
                {format(meeting.endDate.toDate(), 'p', {
                  locale: dateLocale,
                })}
              </Wrap>

              {meeting?.ended && (
                <Tag ml={1}>{t('organisms.MeetingContent.ended')}</Tag>
              )}

              {isStarted && (
                <Tag colorScheme="green" ml={1}>
                  {t('organisms.MeetingContent.started')}
                </Tag>
              )}
            </Wrap>

            {!meeting.ended &&
              (isFacilitator ? (
                <Alert status="info">
                  <AlertIcon />
                  <AlertDescription>
                    {t('organisms.MeetingContent.facilitatorCurrent')}
                  </AlertDescription>
                </Alert>
              ) : (
                facilitator && (
                  <Text>
                    <Trans
                      i18nKey="organisms.MeetingContent.facilitatorMember"
                      components={{
                        member: (
                          <MemberLink
                            id={facilitator.member.id}
                            name={facilitator.member.name}
                          />
                        ),
                      }}
                    />
                  </Text>
                )
              ))}

            {isNotStarted && canEdit && (
              <Button
                leftIcon={<FiPlay />}
                colorScheme="green"
                onClick={handleNextStep}
              >
                {t('organisms.MeetingContent.start')}
              </Button>
            )}

            {meeting.ended && canEdit && forceEdit && (
              <HStack>
                <Button leftIcon={<FiPlay />} onClick={handleNextStep}>
                  {t('organisms.MeetingContent.reopen')}
                </Button>
                <Button leftIcon={<FiX />} onClick={() => setForceEdit(false)}>
                  {t('organisms.MeetingContent.stop')}
                </Button>
              </HStack>
            )}

            {isStarted && canEdit && meeting.videoConf && (
              <Button
                leftIcon={<FiVideo />}
                colorScheme="blue"
                onClick={handleJoinVideoConf}
              >
                {t('organisms.MeetingContent.videoConf')}
              </Button>
            )}

            {!meeting.ended && !canEdit && (
              <Alert status="info">
                <AlertIcon />
                <AlertDescription>
                  {t('organisms.MeetingContent.notInvited')}
                </AlertDescription>
              </Alert>
            )}

            <Collapse in={!!meeting.attendees} animateOpacity>
              {meeting.attendees && (
                <MeetingAttendees
                  meetingId={meeting.id}
                  attendees={meeting.attendees}
                  editable={canEdit && (!meeting.ended || forceEdit)}
                />
              )}
            </Collapse>
          </VStack>

          <Box mt={16}>
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
                    isStarted && canEdit
                      ? () => handleGoToStep(stepConfig.id)
                      : undefined
                  }
                >
                  {step && (
                    <MeetingStepContent
                      meetingId={id}
                      circleId={meeting.circleId}
                      editable={canEdit && (!meeting.ended || forceEdit)}
                      current={current}
                      stepConfig={stepConfig}
                      step={step}
                    />
                  )}

                  {isStarted && canEdit && (
                    <Collapse in={current || last} animateOpacity>
                      <Button
                        leftIcon={last ? <FaStop /> : <FiArrowDown />}
                        colorScheme={current ? 'green' : 'gray'}
                        mt={5}
                        onClick={last ? handleEnd : handleNextStep}
                      >
                        {t(
                          last
                            ? 'organisms.MeetingContent.end'
                            : 'organisms.MeetingContent.nextStep'
                        )}
                      </Button>
                    </Collapse>
                  )}
                </MeetingStepLayout>
              )
            })}

            {isStarted && <MeetingActions circleId={meeting.circleId} />}

            {!isNotStarted && (
              <Container size="xs" mt={10}>
                <Heading as="h3" size="sm" mb={2}>
                  {t('organisms.MeetingContent.logs')}
                </Heading>
                <MeetingLogs
                  meetingId={meeting.id}
                  excludeTypes={taskLogTypes}
                />
              </Container>
            )}
          </Box>
        </>
      )}

      {(loading || stepsLoading) && <Loading active size="md" />}
      <TextErrors errors={[error, stepsError]} />

      {isEditOpen && (
        <MeetingEditModal
          meeting={meeting}
          duplicate={duplicateInModal}
          isOpen
          onClose={onEditClose}
        />
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
