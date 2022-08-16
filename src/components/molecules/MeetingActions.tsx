import {
  Button,
  Flex,
  HStack,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import IconTextButton from '@components/atoms/IconTextButton'
import DecisionEditModal from '@components/organisms/decision/DecisionEditModal'
import MeetingEditModal from '@components/organisms/meeting/MeetingEditModal'
import TaskModal from '@components/organisms/task/TaskModal'
import ThreadEditModal from '@components/organisms/thread/ThreadEditModal'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { MeetingState } from '@hooks/useMeetingState'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { ActivityType } from '@shared/model/activity'
import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaStop } from 'react-icons/fa'
import {
  FiArrowRightCircle,
  FiCalendar,
  FiCheckSquare,
  FiMessageSquare,
  FiPlay,
  FiVideo,
  FiX,
} from 'react-icons/fi'
import settings from 'src/settings'

interface Props {
  meetingState: MeetingState
  forceEdit: boolean
}

export default function MeetingActions({ meetingState, forceEdit }: Props) {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const org = useCurrentOrg()
  const { colorMode } = useColorMode()

  const {
    meeting,
    canEdit,
    isEnded,
    isNotStarted,
    isStarted,
    videoConfUrl,
    handleNextStep,
    handleEnd,
    handleChangeForceEdit,
  } = meetingState

  // Entities creation
  const [entityType, setEntityType] = useState<ActivityType>(
    ActivityType.Thread
  )
  const entityModal = useDisclosure()

  const handleEntityOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement> | ActivityType) => {
      const type =
        typeof event === 'string'
          ? event
          : event.currentTarget.getAttribute('data-type')
      if (!type) return
      setEntityType(type as ActivityType)
      entityModal.onOpen()
    },
    []
  )

  // Video conf
  const [videoConfOpen, setVideoConfOpen] = useState(false)

  // End time passed?
  const [endTimePassed, setEndTimePassed] = useState(false)
  useEffect(() => {
    if (!meeting) return
    const currentSeconds = new Date().getTime() / 1000

    // Detect if end time has passed now
    const endTimePassed = isStarted && meeting.endDate.seconds < currentSeconds
    setEndTimePassed(endTimePassed)

    if (!endTimePassed && isStarted) {
      // If end time has not passed, schedule status change
      const timeout = window.setTimeout(() => {
        setEndTimePassed(true)
      }, (meeting?.endDate.seconds - currentSeconds) * 1000)
      return () => window.clearTimeout(timeout)
    }
  }, [isStarted, meeting?.endDate])

  if (!meeting || !canEdit || (isEnded && !forceEdit)) {
    return null
  }

  // Default description when creating a decision or a task
  const defaultEntityDescription = t(
    'MeetingActions.defaultEntityDescription',
    {
      meeting: `[${meeting.title}](${settings.url}${
        org ? getOrgPath(org) : ''
      }/meetings/${meeting.id})`,
    }
  )

  return (
    <Flex
      position="fixed"
      zIndex={10}
      bottom={0}
      left={0}
      right={0}
      p={3}
      justifyContent="end"
      bg={colorMode === 'light' ? 'white' : 'gray.600'}
      boxShadow={`0 -6px 11px -10px ${
        colorMode === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'
      }`}
    >
      {isNotStarted && (
        <Button
          leftIcon={<FiPlay />}
          colorScheme="green"
          onClick={handleNextStep}
        >
          {t('MeetingActions.start')}
        </Button>
      )}

      {isEnded && forceEdit && (
        <HStack>
          <Button leftIcon={<FiPlay />} onClick={handleNextStep}>
            {t('MeetingActions.reopen')}
          </Button>
          <IconTextButton
            aria-label={t('MeetingActions.stop')}
            icon={<FiX />}
            tooltipPlacement="left"
            onClick={() => handleChangeForceEdit(false)}
          />
        </HStack>
      )}

      {isStarted && (
        <HStack spacing={4}>
          <HStack spacing={2}>
            <IconTextButton
              aria-label={t(`common.createDecision`)}
              size="sm"
              icon={<FiArrowRightCircle />}
              data-type={ActivityType.Decision}
              onClick={handleEntityOpen}
            />

            <IconTextButton
              aria-label={t(`common.createTask`)}
              size="sm"
              icon={<FiCheckSquare />}
              data-type={ActivityType.Task}
              onClick={handleEntityOpen}
            />

            <IconTextButton
              aria-label={t(`common.createMeeting`)}
              size="sm"
              icon={<FiCalendar />}
              data-type={ActivityType.Meeting}
              onClick={handleEntityOpen}
            />

            <IconTextButton
              aria-label={t(`common.createThread`)}
              size="sm"
              icon={<FiMessageSquare />}
              data-type={ActivityType.Thread}
              onClick={handleEntityOpen}
            />
          </HStack>

          <HStack spacing={2}>
            {videoConfUrl && !endTimePassed && (
              <a href={videoConfUrl} target="_blank" rel="noreferrer">
                <IconTextButton
                  aria-label={t('MeetingActions.videoConf')}
                  icon={<FiVideo />}
                  colorScheme="blue"
                  showText={!videoConfOpen}
                  onClick={() => setVideoConfOpen(true)}
                />
              </a>
            )}

            <IconTextButton
              aria-label={t('MeetingActions.end')}
              icon={<FaStop />}
              colorScheme="blue"
              showText={endTimePassed}
              onClick={handleEnd}
            />
          </HStack>
        </HStack>
      )}

      {entityModal.isOpen && (
        <>
          {entityType === ActivityType.Thread && (
            <ThreadEditModal
              defaultCircleId={meeting.circleId}
              isOpen
              onClose={entityModal.onClose}
            />
          )}

          {entityType === ActivityType.Meeting && (
            <MeetingEditModal
              meeting={meeting}
              duplicate
              isOpen
              onClose={entityModal.onClose}
            />
          )}

          {entityType === ActivityType.Task && (
            <TaskModal
              defaultCircleId={meeting.circleId}
              defaultMemberId={currentMember?.id}
              defaultDescription={defaultEntityDescription}
              isOpen
              onClose={entityModal.onClose}
            />
          )}

          {entityType === ActivityType.Decision && (
            <DecisionEditModal
              defaultCircleId={meeting.circleId}
              defaultDescription={defaultEntityDescription}
              isOpen
              onClose={entityModal.onClose}
            />
          )}
        </>
      )}
    </Flex>
  )
}
