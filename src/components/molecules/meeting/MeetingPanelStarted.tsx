import BounceAnimation from '@atoms/BounceAnimation'
import IconTextButton from '@atoms/IconTextButton'
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { Thread_Activity_Type_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import DecisionEditModal from '@organisms/decision/DecisionEditModal'
import MeetingEditModal from '@organisms/meeting/MeetingEditModal'
import TaskModal from '@organisms/task/TaskModal'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { MouseEvent, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaStop } from 'react-icons/fa'
import {
  FiArrowDown,
  FiCalendar,
  FiCheckSquare,
  FiMessageSquare,
  FiPlus,
  FiTriangle,
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
  const [entityType, setEntityType] = useState<Thread_Activity_Type_Enum>(
    Thread_Activity_Type_Enum.Thread
  )
  const entityModal = useDisclosure()

  const handleEntityOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement> | Thread_Activity_Type_Enum) => {
      const type =
        typeof event === 'string'
          ? event
          : event.currentTarget.getAttribute('data-type')
      if (!type) return
      setEntityType(type as Thread_Activity_Type_Enum)
      entityModal.onOpen()
    },
    []
  )

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
      <Box>
        <Menu isLazy>
          <MenuButton as={Button} size="sm" leftIcon={<FiPlus />}>
            {t(`common.add`)}
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<FiTriangle />}
              data-type={Thread_Activity_Type_Enum.Decision}
              onClick={handleEntityOpen}
            >
              {t(`common.createDecision`)}
            </MenuItem>
            <MenuItem
              icon={<FiCheckSquare />}
              data-type={Thread_Activity_Type_Enum.Task}
              onClick={handleEntityOpen}
            >
              {t(`common.createTask`)}
            </MenuItem>
            <MenuItem
              icon={<FiCalendar />}
              data-type={Thread_Activity_Type_Enum.Meeting}
              onClick={handleEntityOpen}
            >
              {t(`common.createMeeting`)}
            </MenuItem>
            <MenuItem
              icon={<FiMessageSquare />}
              data-type={Thread_Activity_Type_Enum.Thread}
              onClick={handleEntityOpen}
            >
              {t(`common.createThread`)}
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <HStack spacing={2}>
        {videoConfUrl && (
          <a href={videoConfUrl} target="_blank" rel="noreferrer">
            <IconTextButton
              aria-label={t('MeetingPanelStarted.videoConf')}
              icon={<FiVideo />}
              colorScheme="blue"
            />
          </a>
        )}

        {!isLastStep && (
          <IconTextButton
            aria-label={t('MeetingPanelStarted.next')}
            icon={<FiArrowDown />}
            colorScheme="blue"
            showText
            onClick={handleNextStep}
          />
        )}

        <BounceAnimation active={isEndTimePassed}>
          <IconTextButton
            aria-label={t('MeetingPanelStarted.end')}
            icon={<FaStop />}
            colorScheme="pink"
            showText={isEndTimePassed || isLastStep}
            onClick={handleEnd}
          />
        </BounceAnimation>
      </HStack>

      {entityModal.isOpen && (
        <>
          {entityType === Thread_Activity_Type_Enum.Thread && (
            <ThreadEditModal
              defaultCircleId={meeting.circleId}
              isOpen
              onClose={entityModal.onClose}
            />
          )}

          {entityType === Thread_Activity_Type_Enum.Meeting && (
            <MeetingEditModal
              defaultCircleId={meeting.circleId}
              isOpen
              onClose={entityModal.onClose}
            />
          )}

          {entityType === Thread_Activity_Type_Enum.Task && (
            <TaskModal
              defaultCircleId={meeting.circleId}
              defaultMemberId={currentMember?.id}
              defaultDescription={defaultEntityDescription}
              isOpen
              onClose={entityModal.onClose}
            />
          )}

          {entityType === Thread_Activity_Type_Enum.Decision && (
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
