import BounceAnimation from '@atoms/BounceAnimation'
import IconTextButton from '@atoms/IconTextButton'
import { HStack, useDisclosure } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import DecisionEditModal from '@organisms/decision/DecisionEditModal'
import MeetingEditModal from '@organisms/meeting/MeetingEditModal'
import TaskModal from '@organisms/task/TaskModal'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { ActivityType } from '@shared/model/thread_activity'
import React, { MouseEvent, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaStop } from 'react-icons/fa'
import {
  FiArrowDown,
  FiArrowRightCircle,
  FiCalendar,
  FiCheckSquare,
  FiMessageSquare,
  FiVideo,
} from 'react-icons/fi'
import settings from 'src/settings'

export default function MeetingPanelStarted() {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const org = useCurrentOrg()

  const {
    meeting,
    isEndTimePassed,
    isLastStep,
    videoConfUrl,
    handleNextStep,
    handleEnd,
  } = useContext(MeetingContext)!

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

  if (!meeting) return null

  // Default description when creating a decision or a task
  const defaultEntityDescription = t(
    'MeetingPanelStarted.defaultEntityDescription',
    {
      meeting: `[${meeting.title}](${settings.url}${
        org ? getOrgPath(org) : ''
      }/meetings/${meeting.id})`,
    }
  )

  return (
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
        {videoConfUrl && (
          <a href={videoConfUrl} target="_blank" rel="noreferrer">
            <IconTextButton
              aria-label={t('MeetingPanelStarted.videoConf')}
              icon={<FiVideo />}
              colorScheme="blue"
              showText={!videoConfOpen}
              onClick={() => setVideoConfOpen(true)}
            />
          </a>
        )}

        <BounceAnimation active={isEndTimePassed}>
          {isLastStep ? (
            <IconTextButton
              aria-label={t('MeetingPanelStarted.end')}
              icon={<FaStop />}
              colorScheme="pink"
              showText={isEndTimePassed}
              onClick={handleEnd}
            />
          ) : (
            <IconTextButton
              aria-label={t('MeetingPanelStarted.next')}
              icon={<FiArrowDown />}
              colorScheme="blue"
              showText
              onClick={handleNextStep}
            />
          )}
        </BounceAnimation>
      </HStack>

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
              defaultCircleId={meeting.circleId}
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
    </HStack>
  )
}
