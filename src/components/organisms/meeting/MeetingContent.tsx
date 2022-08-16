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
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import ActionsMenu from '@components/molecules/ActionsMenu'
import MeetingActions from '@components/molecules/MeetingActions'
import MeetingAttendees from '@components/molecules/MeetingAttendees'
import MeetingLogs from '@components/molecules/MeetingLogs'
import MeetingStepContent from '@components/molecules/MeetingStepContent'
import { taskLogTypes } from '@components/molecules/MeetingStepContentTasks'
import MeetingStepLayout from '@components/molecules/MeetingStepLayout'
import ParticipantsNumber from '@components/molecules/ParticipantsNumber'
import useDateLocale from '@hooks/useDateLocale'
import useMeetingState from '@hooks/useMeetingState'
import useOrgMember from '@hooks/useOrgMember'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FaStop } from 'react-icons/fa'
import { FiArrowDown, FiCalendar, FiClock } from 'react-icons/fi'
import { capitalizeFirstLetter } from 'src/utils'
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
  const dateLocale = useDateLocale()
  const isMember = useOrgMember()

  // Load meeting and steps
  const meetingState = useMeetingState(id)

  const {
    meeting,
    loading,
    error,
    steps,
    circle,
    facilitator,
    participants,
    canEdit,
    forceEdit,
    isFacilitator,
    isEnded,
    isNotStarted,
    isStarted,
    handleGoToStep,
    handleEnd,
    handleNextStep,
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
          <Trans
            i18nKey="MeetingContent.heading"
            values={{ title: meeting?.title || '…' }}
            components={{
              circle: circle ? <CircleButton circle={circle} mx={1} /> : <></>,
            }}
          />
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
              onDelete={canEdit && !isStarted ? deleteModal.onOpen : undefined}
            />
          )}

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

              {meeting?.ended && <Tag ml={1}>{t('MeetingContent.ended')}</Tag>}

              {isStarted && (
                <Tag colorScheme="green" ml={1}>
                  {t('MeetingContent.started')}
                </Tag>
              )}
            </Wrap>

            {!isEnded &&
              (isFacilitator ? (
                <Alert status="info">
                  <AlertIcon />
                  <AlertDescription>
                    {t('MeetingContent.facilitatorCurrent')}
                  </AlertDescription>
                </Alert>
              ) : (
                facilitator && (
                  <Text>
                    <Trans
                      i18nKey="MeetingContent.facilitatorMember"
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

            {!isEnded && !canEdit && (
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
              const last = index === meeting.stepsConfig.length - 1
              const step = steps?.find((s) => s.id === stepConfig.id)
              const current = meeting.currentStepId === stepConfig.id
              if (!step) return null

              return (
                <MeetingStepLayout
                  key={stepConfig.id}
                  index={index}
                  stepId={step.id}
                  title={stepConfig.title}
                  last={last}
                  current={current}
                  onNumberClick={
                    isStarted && canEdit
                      ? () => handleGoToStep(stepConfig.id)
                      : undefined
                  }
                >
                  {index === 0 && (
                    <Collapse in={!!meeting.attendees} animateOpacity>
                      {meeting.attendees && (
                        <MeetingAttendees
                          meetingId={meeting.id}
                          attendees={meeting.attendees}
                          editable={canEdit && (!isEnded || forceEdit)}
                          my={5}
                        />
                      )}
                    </Collapse>
                  )}

                  <MeetingStepContent
                    meetingId={id}
                    circleId={meeting.circleId}
                    editable={canEdit && (!isEnded || forceEdit)}
                    started={isStarted}
                    step={step}
                  />

                  {isStarted && canEdit && (
                    <Collapse in={current || last} animateOpacity>
                      <Button
                        leftIcon={last ? <FaStop /> : <FiArrowDown />}
                        colorScheme={
                          current ? (last ? 'blue' : 'green') : 'gray'
                        }
                        mt={5}
                        onClick={last ? handleEnd : handleNextStep}
                      >
                        {t(
                          last
                            ? 'MeetingContent.end'
                            : 'MeetingContent.nextStep'
                        )}
                      </Button>
                    </Collapse>
                  )}
                </MeetingStepLayout>
              )
            })}

            {canEdit && (
              <MeetingActions
                meetingState={meetingState}
                forceEdit={forceEdit}
              />
            )}

            {!isNotStarted && (
              <Container size="xs" mt={10}>
                <Heading as="h3" size="sm" mb={2}>
                  {t('MeetingContent.logs')}
                </Heading>
                <MeetingLogs
                  meetingId={meeting.id}
                  excludeTypes={taskLogTypes}
                />
              </Container>
            )}

            <Box h="100px" />
          </Box>
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
  )
}
