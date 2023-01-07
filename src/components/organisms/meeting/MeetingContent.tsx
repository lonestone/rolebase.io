import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  BoxProps,
  Collapse,
  Flex,
  Heading,
  Spacer,
  Tag,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import useMeetingState from '@hooks/useMeetingState'
import useOrgMember from '@hooks/useOrgMember'
import ActionsMenu from '@molecules/ActionsMenu'
import MeetingAttendeesList from '@molecules/meeting/MeetingAttendeesList'
import MeetingDate from '@molecules/meeting/MeetingDate'
import MeetingLogs from '@molecules/meeting/MeetingLogs'
import MeetingPanel from '@molecules/meeting/MeetingPanel'
import MeetingStepContent from '@molecules/meeting/MeetingStepContent'
import { taskLogTypes } from '@molecules/meeting/MeetingStepContentTasks'
import MeetingStepLayout from '@molecules/meeting/MeetingStepLayout'
import MeetingTitle from '@molecules/meeting/MeetingTitle'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MeetingDeleteModal from './MeetingDeleteModal'
import MeetingEditModal from './MeetingEditModal'

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
  const isMember = useOrgMember()

  // Load meeting and steps
  const meetingState = useMeetingState(id)

  const {
    meeting,
    loading,
    error,
    steps,
    circle,
    participants,
    canEdit,
    forceEdit,
    isEnded,
    isNotStarted,
    isStarted,
    handleGoToStep,
    handleChangeForceEdit,
  } = meetingState

  // Meeting edition modal
  const [duplicateInModal, setDuplicateInModal] = useState(false)
  const editModal = useDisclosure()

  const handleEdit = () => {
    setDuplicateInModal(false)
    editModal.onOpen()
  }

  const handleDuplicate = () => {
    setDuplicateInModal(true)
    editModal.onOpen()
  }

  // Meeting deletion modal
  const deleteModal = useDisclosure()

  return (
    <MeetingContext.Provider value={meetingState}>
      <Box {...boxProps}>
        {changeTitle && (
          <Title>
            {t('MeetingContent.title', {
              circle: circle?.role.name || '',
              title: meeting?.title || '…',
            })}
          </Title>
        )}

        <Flex mb={3}>
          <Heading as="h1" size="md">
            <MeetingTitle />
          </Heading>

          {meeting?.archived && <Tag ml={2}>{t('common.archived')}</Tag>}

          <Spacer />

          <Flex mr={headerIcons ? -2 : 0}>
            <ParticipantsNumber participants={participants} mr={1} />

            {isMember && (
              <ActionsMenu
                onEdit={
                  canEdit
                    ? meeting?.ended && !forceEdit
                      ? () => handleChangeForceEdit(true)
                      : handleEdit
                    : undefined
                }
                onDuplicate={handleDuplicate}
                onDelete={
                  canEdit && !isStarted ? deleteModal.onOpen : undefined
                }
              />
            )}

            {headerIcons}
          </Flex>
        </Flex>

        {meeting && (
          <>
            <VStack spacing={5} align="start">
              <Wrap spacing={5} align="center" fontSize="sm">
                <MeetingDate meeting={meeting} />

                {meeting?.ended ? (
                  <Tag ml={1}>{t('MeetingContent.ended')}</Tag>
                ) : (
                  isStarted && (
                    <Tag colorScheme="green" ml={1}>
                      {t('MeetingContent.started')}
                    </Tag>
                  )
                )}
              </Wrap>

              {isMember && !isEnded && !canEdit && (
                <Alert status="info">
                  <AlertIcon />
                  <AlertDescription>
                    {t('MeetingContent.notInvited')}
                  </AlertDescription>
                </Alert>
              )}
            </VStack>

            <Box mt={16}>
              {meeting.stepsConfig.map((stepConfig, index) => {
                const step = steps?.find(
                  (s) => s.stepConfigId === stepConfig.id
                )
                if (!step) return null
                const current = meeting.currentStepId === step.id

                return (
                  <MeetingStepLayout
                    key={step.id}
                    index={index}
                    stepId={step.id}
                    title={stepConfig.title}
                    current={current}
                    onStepClick={
                      isStarted && canEdit
                        ? () => handleGoToStep(step.id)
                        : undefined
                    }
                  >
                    {index === 0 && (
                      <Collapse in={!!meeting.attendees} animateOpacity>
                        {meeting.attendees && circle && (
                          <MeetingAttendeesList mb={5} />
                        )}
                      </Collapse>
                    )}

                    <MeetingStepContent step={step} />
                  </MeetingStepLayout>
                )
              })}

              {!isNotStarted && (
                <Box mt={10}>
                  <MeetingLogs
                    meetingId={meeting.id}
                    excludeTypes={taskLogTypes}
                    hideEmpty
                    header={
                      <Heading as="h2" size="md" mb={2}>
                        {t('MeetingContent.logs')}
                      </Heading>
                    }
                  />
                </Box>
              )}

              <Box h="100px" />
            </Box>

            {canEdit && (
              <MeetingPanel forceEdit={forceEdit} isModal={!changeTitle} />
            )}
          </>
        )}

        {loading && <Loading active size="md" />}
        <TextErrors errors={[error]} />

        {editModal.isOpen && (
          <MeetingEditModal
            meeting={meeting}
            duplicate={duplicateInModal}
            isOpen
            onClose={editModal.onClose}
          />
        )}

        {deleteModal.isOpen && meeting && (
          <MeetingDeleteModal
            meeting={meeting}
            isOpen
            onClose={deleteModal.onClose}
            onDelete={onClose}
          />
        )}
      </Box>
    </MeetingContext.Provider>
  )
}
