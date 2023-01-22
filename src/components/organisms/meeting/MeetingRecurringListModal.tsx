import CircleByIdButton from '@atoms/CircleByIdButton'
import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  UseModalProps,
} from '@chakra-ui/react'
import {
  MeetingRecurringFragment,
  useSubscribeCircleMeetingRecurringsSubscription,
} from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import ListItemWithButtons from '@molecules/ListItemWithButtons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { RRule } from 'rrule'
import MeetingRecurringDeleteModal from './MeetingRecurringDeleteModal'
import MeetingRecurringEditModal from './MeetingRecurringEditModal'

interface Props extends UseModalProps {
  circleId?: string
}

export default function MeetingRecurringListModal({
  circleId,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()

  // Subscribe to recurring meetings
  const { data, loading, error } =
    useSubscribeCircleMeetingRecurringsSubscription({
      skip: !orgId,
      variables: {
        where: circleId
          ? { circleId: { _eq: circleId } }
          : { orgId: { _eq: orgId } },
      },
    })
  const meetingsRecurring = data?.meeting_recurring

  // Create/Edit modal
  const [meetingRecurring, setMeetingRecurring] = useState<
    MeetingRecurringFragment | undefined
  >()
  const editModal = useDisclosure()

  // Delete modal
  const deleteModal = useDisclosure()

  const handleCreate = () => {
    setMeetingRecurring(undefined)
    editModal.onOpen()
  }

  const handleEdit = (mt: MeetingRecurringFragment) => {
    setMeetingRecurring(mt)
    editModal.onOpen()
  }

  const handleDelete = (mt: MeetingRecurringFragment) => {
    setMeetingRecurring(mt)
    deleteModal.onOpen()
  }

  return (
    <>
      <Modal {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t('MeetingRecurringListModal.heading')}
            {circleId && <CircleByIdButton id={circleId} ml={2} />}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {loading && <Loading active size="md" />}
            <TextErrors errors={[error]} />

            {!meetingsRecurring?.length ? (
              <Text fontStyle="italic">
                {t('MeetingRecurringListModal.empty')}
              </Text>
            ) : (
              meetingsRecurring?.map((mt) => (
                <ListItemWithButtons
                  key={mt.id}
                  mb={2}
                  onClick={() => handleEdit(mt)}
                  buttons={
                    <>
                      {!circleId && (
                        <CircleByIdButton id={mt.circleId} ml={2} />
                      )}
                      <IconButton
                        aria-label={t('common.delete')}
                        size="sm"
                        variant="ghost"
                        zIndex={2}
                        onClick={() => handleDelete(mt)}
                        icon={<FiTrash2 />}
                      />
                    </>
                  }
                >
                  <Text>{mt.template.title}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {RRule.fromString(mt.rrule).toText()}
                  </Text>
                </ListItemWithButtons>
              ))
            )}
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button leftIcon={<FiPlus />} onClick={handleCreate}>
              {t('MeetingRecurringListModal.create')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {editModal.isOpen && (
        <MeetingRecurringEditModal
          meetingRecurring={meetingRecurring}
          defaultCircleId={circleId}
          isOpen
          onClose={editModal.onClose}
        />
      )}

      {deleteModal.isOpen && meetingRecurring && (
        <MeetingRecurringDeleteModal
          meetingRecurring={meetingRecurring}
          isOpen
          onClose={deleteModal.onClose}
        />
      )}
    </>
  )
}
