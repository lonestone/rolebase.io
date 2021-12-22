import { subscribeMeeting } from '@api/entities/meetings'
import {
  Flex,
  FormControl,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  useDisclosure,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import TextErrors from '@components/atoms/TextErrors'
import useParticipants from '@hooks/useParticipants'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import { FiEdit3 } from 'react-icons/fi'
import MeetingEditModal from './MeetingModalEdit'

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
          {loading && <Loading active size="md" />}
          <TextErrors errors={[error]} />

          {meeting && (
            <VStack spacing={5} align="stretch">
              <FormControl>
                {meeting.stepsConfig.map((step, index) => (
                  <Flex key={step.id} alignItems="center" mb={3}>
                    <Tag
                      colorScheme={
                        meeting.currentStepId === step.id ? 'green' : undefined
                      }
                      size="lg"
                      borderRadius="full"
                      cursor="grab"
                      mr={3}
                    >
                      {index + 1}
                    </Tag>
                    <Heading as="h2" size="sm">
                      {step.title}
                    </Heading>
                  </Flex>
                ))}
              </FormControl>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>

      {isEditOpen && (
        <MeetingEditModal meeting={meeting} isOpen onClose={onEditClose} />
      )}
    </Modal>
  )
}
