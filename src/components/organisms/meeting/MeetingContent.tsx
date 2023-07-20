import CircleButton from '@atoms/CircleButton'
import Loading from '@atoms/Loading'
import { Title } from '@atoms/Title'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  BoxProps,
  Collapse,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spacer,
  Tag,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useCopyNotesMeeting } from '@hooks/useCopyNotesMeeting'
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
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import ScrollableLayout from '@molecules/ScrollableLayout'
import Page404 from '@pages/Page404'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCalendar } from 'react-icons/fi'
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

  const copyStepNotes = useCopyNotesMeeting()

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

  const handleNotesChange = async () => {
    if (!meeting) return
    await copyStepNotes(meeting, steps)
  }

  if (error) {
    console.error(error)
    return <Page404 />
  }

  return (
    <MeetingContext.Provider value={meetingState}>
      <ScrollableLayout
        {...boxProps}
        header={
          <Box w="100%">
            <Flex w="100%">
              {changeTitle && (
                <Title>
                  {t('MeetingContent.title', {
                    circle: circle?.role.name || '',
                    title: meeting?.title || '…',
                  })}
                </Title>
              )}

              <Wrap spacing={2} flex={1} align="center">
                <HStack spacing={2}>
                  <Icon as={FiCalendar} />
                  <Heading as="h1" size="md">
                    {isMember ? (
                      <Link href="#" onClick={editModal.onOpen}>
                        {t('MeetingContent.heading', {
                          title: meeting?.title || '…',
                        })}
                      </Link>
                    ) : (
                      t('MeetingContent.heading', {
                        title: meeting?.title || '…',
                      })
                    )}
                  </Heading>
                </HStack>

                <Spacer />

                <HStack spacing={2}>
                  {meeting?.archived && <Tag>{t('common.archived')}</Tag>}

                  {circle && <CircleButton circle={circle} />}

                  <Box>
                    <ParticipantsNumber participants={participants} />
                  </Box>
                </HStack>
              </Wrap>

              <Flex mr={headerIcons ? -2 : 0}>
                {canEdit && (
                  <ActionsMenu
                    ml={2}
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
                    onCopyStepNotes={handleNotesChange}
                  />
                )}
                {headerIcons}
              </Flex>
            </Flex>

            {meeting && (
              <Wrap spacing={5} align="center" fontSize="sm" ml={6}>
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
            )}
          </Box>
        }
        content={
          <>
            {loading && <Loading active size="md" />}
            {meeting && (
              <Container maxW="3xl" py={10}>
                {isMember && !isEnded && !canEdit && (
                  <Alert status="info" mb={10}>
                    <AlertIcon />
                    <AlertDescription>
                      {t('MeetingContent.notInvited')}
                    </AlertDescription>
                  </Alert>
                )}

                <Collapse in={!!meeting.attendees} animateOpacity>
                  {meeting.attendees && circle && (
                    <MeetingAttendeesList mb={16} />
                  )}
                </Collapse>

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
                      <MeetingStepContent step={step} />
                    </MeetingStepLayout>
                  )
                })}

                {!isNotStarted && (
                  <Box mt={10}>
                    <MeetingLogs
                      meetingId={meeting.id}
                      title={t('MeetingContent.logs')}
                      excludeTypes={taskLogTypes}
                      hideEmpty
                    />
                  </Box>
                )}

                <Box h="100px" />
              </Container>
            )}
          </>
        }
        footer={
          canEdit ? (
            <MeetingPanel forceEdit={forceEdit} isModal={!changeTitle} />
          ) : undefined
        }
      />

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
    </MeetingContext.Provider>
  )
}
