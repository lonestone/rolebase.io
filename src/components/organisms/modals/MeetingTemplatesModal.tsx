import { subscribeAllMeetingTemplates } from '@api/entities/meetingTemplates'
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
  useDisclosure,
  UseModalProps,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import useSubscription from '@hooks/useSubscription'
import { MeetingTempalteEntry } from '@shared/meetingTemplate'
import { useStoreState } from '@store/hooks'
import React, { useState } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import ListItemWithButtons from './ListItemWithButtons'
import MeetingTemplateDeleteModal from './MeetingTemplateDeleteModal'
import MeetingTemplateModal from './MeetingTemplateModal'

export default function MeetingTemplatesModal(modalProps: UseModalProps) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const {
    data: meetingTemplates,
    loading,
    error,
  } = useSubscription(orgId ? subscribeAllMeetingTemplates(orgId) : undefined)

  // Create/Edit modal
  const [meetingTemplate, setMeetingTemplate] = useState<
    MeetingTempalteEntry | undefined
  >()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const handleCreate = () => {
    setMeetingTemplate(undefined)
    onEditOpen()
  }

  const handleEdit = (mt: MeetingTempalteEntry) => {
    setMeetingTemplate(mt)
    onEditOpen()
  }

  const handleDelete = (mt: MeetingTempalteEntry) => {
    setMeetingTemplate(mt)
    onDeleteOpen()
  }

  return (
    <>
      <Modal {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Templates de réunions</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {loading && <Loading active size="md" />}
            <TextErrors errors={[error]} />

            {!meetingTemplates?.length ? (
              <i>Aucun template de réunion</i>
            ) : (
              meetingTemplates?.map((mt) => (
                <ListItemWithButtons
                  key={mt.id}
                  title={mt.title}
                  onClick={() => handleEdit(mt)}
                  buttons={
                    <IconButton
                      aria-label=""
                      size="sm"
                      onClick={() => handleDelete(mt)}
                      icon={<FiTrash2 />}
                    />
                  }
                />
              ))
            )}
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button leftIcon={<FiPlus />} onClick={handleCreate}>
              Créer un nouveau template de réunion
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isEditOpen && (
        <MeetingTemplateModal
          meetingTemplate={meetingTemplate}
          isOpen
          onClose={onEditClose}
        />
      )}

      {isDeleteOpen && meetingTemplate && (
        <MeetingTemplateDeleteModal
          meetingTemplate={meetingTemplate}
          isOpen
          onClose={onDeleteClose}
        />
      )}
    </>
  )
}
