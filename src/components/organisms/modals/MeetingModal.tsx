import { nextMeetingStep, subscribeMeeting } from '@api/entities/meetings'
import { meetingStepsEntities } from '@api/entities/meetingSteps'
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  UseModalProps,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import Markdown from '@components/atoms/Markdown'
import MarkdownEditor from '@components/atoms/MarkdownEditor'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import TextErrors from '@components/atoms/TextErrors'
import MeetingStepLayout from '@components/molecules/MeetingStepLayout'
import useParticipants from '@hooks/useParticipants'
import useSubscription from '@hooks/useSubscription'
import { MeetingStepTypes } from '@shared/meeting'
import React, { useCallback } from 'react'
import { FaStop } from 'react-icons/fa'
import { FiArrowDown, FiEdit3, FiPlay } from 'react-icons/fi'
import MeetingEditModal from './MeetingEditModal'

interface Props extends UseModalProps {
  id: string
}

export default function MeetingModal({ id, ...modalProps }: Props) {
  // Subscribe meeting
  const {
    data: meeting,
    loading,
    error,
  } = useSubscription(subscribeMeeting(id))

  // Subscribe meeting steps
  const { createMeetingStep, updateMeetingStep, subscribeMeetingSteps } =
    meetingStepsEntities(id)
  const {
    data: steps,
    error: stepsError,
    loading: stepsLoading,
  } = useSubscription(subscribeMeetingSteps())

  // Participants
  const participants = useParticipants(
    meeting?.circleId,
    meeting?.participantsScope,
    meeting?.participantsMembersIds
  )

  // Meeting edition modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Next step
  const handleNextStep = useCallback(() => {
    if (!meeting) return
    nextMeetingStep(meeting)
  }, [meeting])

  return (
    <Modal size="xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {meeting?.title}
          <ParticipantsNumber participants={participants} ml={5} />
          <IconButton
            aria-label=""
            icon={<FiEdit3 />}
            size="sm"
            ml={2}
            onClick={onEditOpen}
          />
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {(loading || stepsLoading) && <Loading active size="md" />}
          <TextErrors errors={[error, stepsError]} />

          {meeting && (
            <>
              {meeting.currentStepId === null && !meeting.ended && (
                <Button
                  leftIcon={<FiPlay />}
                  colorScheme="green"
                  mb={5}
                  onClick={handleNextStep}
                >
                  Démarrer
                </Button>
              )}

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
                  >
                    {stepConfig.type === MeetingStepTypes.Threads &&
                      'Ajouter une discussion'}

                    {current ? (
                      <MarkdownEditor
                        value={step?.notes || ''}
                        placeholder="Notes..."
                        onChange={() => {}}
                      />
                    ) : (
                      <Markdown>{step?.notes || ''}</Markdown>
                    )}

                    {current && (
                      <Button
                        leftIcon={last ? <FaStop /> : <FiArrowDown />}
                        colorScheme={'green'}
                        mt={5}
                        onClick={handleNextStep}
                      >
                        {last ? 'Terminer' : 'Suivant'}
                      </Button>
                    )}
                  </MeetingStepLayout>
                )
              })}

              {meeting.ended && (
                <Button
                  variant="ghost"
                  leftIcon={<FiPlay />}
                  mt={1}
                  onClick={handleNextStep}
                >
                  Reprendre la réunion
                </Button>
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>

      {isEditOpen && (
        <MeetingEditModal meeting={meeting} isOpen onClose={onEditClose} />
      )}
    </Modal>
  )
}
