import BounceAnimation from '@atoms/BounceAnimation'
import IconTextButton from '@atoms/IconTextButton'
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { Thread_Activity_Type_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import DecisionEditModal from '@organisms/decision/DecisionEditModal'
import MeetingEditModal from '@organisms/meeting/MeetingEditModal'
import TaskModal from '@organisms/task/TaskModal'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import React, { MouseEvent, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'
import {
  CreateIcon,
  DecisionIcon,
  MeetingIcon,
  StopIcon,
  TaskIcon,
  ThreadIcon,
} from 'src/icons'
import settings from 'src/settings'

export default function MeetingPanelStarted() {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const org = useCurrentOrg()

  const {
    meeting,
    currentStep,
    currentStepConfig,
    isEndTimePassed,
    isLastStep,
    canEdit,
    isStarted,
    handleScrollToStep,
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

  const handleStepLinkClick = useNormalClickHandler(() => {
    if (!currentStep) return
    handleScrollToStep(currentStep?.id)
  })

  if (!meeting || !canEdit || !isStarted) {
    return null
  }

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
    <Container
      maxW="3xl"
      py={5}
      display="flex"
      justifyContent="space-between"
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      {currentStepConfig ? (
        <Link
          href={`step-${currentStep?.id}`}
          display="flex"
          fontSize="lg"
          alignItems="center"
          onClick={handleStepLinkClick}
        >
          <Icon as={FiArrowRight} mr={2} />
          {currentStepConfig?.title}
        </Link>
      ) : (
        <Spacer />
      )}

      <Flex alignItems="center" justifyContent="end" flexWrap="wrap">
        <Box mr={4}>
          <Menu isLazy>
            <MenuButton
              as={Button}
              size="sm"
              my={2}
              leftIcon={<CreateIcon size={20} />}
            >
              {t(`common.add`)}
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<DecisionIcon size={20} />}
                data-type={Thread_Activity_Type_Enum.Decision}
                onClick={handleEntityOpen}
              >
                {t(`common.createDecision`)}
              </MenuItem>
              <MenuItem
                icon={<TaskIcon size={20} />}
                data-type={Thread_Activity_Type_Enum.Task}
                onClick={handleEntityOpen}
              >
                {t(`common.createTask`)}
              </MenuItem>
              <MenuItem
                icon={<MeetingIcon size={20} />}
                data-type={Thread_Activity_Type_Enum.Meeting}
                onClick={handleEntityOpen}
              >
                {t(`common.createMeeting`)}
              </MenuItem>
              <MenuItem
                icon={<ThreadIcon size={20} />}
                data-type={Thread_Activity_Type_Enum.Thread}
                onClick={handleEntityOpen}
              >
                {t(`common.createThread`)}
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <HStack spacing={2}>
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
              icon={<StopIcon variant="Bold" />}
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
                defaultPrivate={meeting.private}
                isOpen
                onClose={entityModal.onClose}
              />
            )}

            {entityType === Thread_Activity_Type_Enum.Meeting && (
              <MeetingEditModal
                defaultCircleId={meeting.circleId}
                defaultPrivate={meeting.private}
                isOpen
                onClose={entityModal.onClose}
              />
            )}

            {entityType === Thread_Activity_Type_Enum.Task && (
              <TaskModal
                defaultCircleId={meeting.circleId}
                defaultMemberId={currentMember?.id}
                defaultDescription={defaultEntityDescription}
                defaultPrivate={meeting.private}
                isOpen
                onClose={entityModal.onClose}
              />
            )}

            {entityType === Thread_Activity_Type_Enum.Decision && (
              <DecisionEditModal
                defaultCircleId={meeting.circleId}
                defaultDescription={defaultEntityDescription}
                defaultPrivate={meeting.private}
                isOpen
                onClose={entityModal.onClose}
              />
            )}
          </>
        )}
      </Flex>
    </Container>
  )
}
