import {
  Button,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import DecisionEditModal from '@components/organisms/decision/DecisionEditModal'
import MeetingEditModal from '@components/organisms/meeting/MeetingEditModal'
import TaskModal from '@components/organisms/task/TaskModal'
import ThreadEditModal from '@components/organisms/thread/ThreadEditModal'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { MeetingState } from '@hooks/useMeetingState'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { ActivityType } from '@shared/model/activity'
import React, { MouseEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
    handleNextStep,
    handleJoinVideoConf,
    handleChangeForceEdit,
  } = meetingState

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

  if (!meeting || !canEdit || (isEnded && !forceEdit)) {
    return null
  }

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
          <Tooltip label={t('MeetingActions.stop')} placement="left" hasArrow>
            <IconButton
              aria-label={t('MeetingActions.stop')}
              icon={<FiX />}
              onClick={() => handleChangeForceEdit(false)}
            />
          </Tooltip>
        </HStack>
      )}

      {isStarted && (
        <>
          {meeting.videoConf && (
            <Button
              leftIcon={<FiVideo />}
              colorScheme="blue"
              onClick={handleJoinVideoConf}
            >
              {t('MeetingActions.videoConf')}
            </Button>
          )}

          <HStack>
            <Tooltip
              label={t(`common.createDecision`)}
              placement="top"
              hasArrow
            >
              <IconButton
                aria-label={t(`common.createDecision`)}
                size="sm"
                icon={<FiArrowRightCircle />}
                data-type={ActivityType.Decision}
                onClick={handleEntityOpen}
              />
            </Tooltip>

            <Tooltip label={t(`common.createTask`)} placement="top" hasArrow>
              <IconButton
                aria-label={t(`common.createTask`)}
                size="sm"
                icon={<FiCheckSquare />}
                data-type={ActivityType.Task}
                onClick={handleEntityOpen}
              />
            </Tooltip>

            <Tooltip label={t(`common.createMeeting`)} placement="top" hasArrow>
              <IconButton
                aria-label={t(`common.createMeeting`)}
                size="sm"
                icon={<FiCalendar />}
                data-type={ActivityType.Meeting}
                onClick={handleEntityOpen}
              />
            </Tooltip>

            <Tooltip label={t(`common.createThread`)} placement="top" hasArrow>
              <IconButton
                aria-label={t(`common.createThread`)}
                size="sm"
                icon={<FiMessageSquare />}
                data-type={ActivityType.Thread}
                onClick={handleEntityOpen}
              />
            </Tooltip>
          </HStack>
        </>
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
