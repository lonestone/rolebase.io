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
  Text,
  useDisclosure,
  UseModalProps,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ListItemWithButtons from '@components/molecules/ListItemWithButtons'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import { MeetingTempalteEntry } from '@shared/model/meetingTemplate'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import MeetingTemplateDeleteModal from './MeetingTemplateDeleteModal'
import MeetingTemplateModal from './MeetingTemplateModal'

export default function MeetingTemplatesModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()
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
          <ModalHeader>{t('MeetingTemplatesModal.heading')}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {loading && <Loading active size="md" />}
            <TextErrors errors={[error]} />

            {!meetingTemplates?.length ? (
              <Text fontStyle="italic">{t('MeetingTemplatesModal.empty')}</Text>
            ) : (
              meetingTemplates?.map((mt) => (
                <ListItemWithButtons
                  key={mt.id}
                  title={mt.title}
                  onClick={() => handleEdit(mt)}
                  buttons={
                    <IconButton
                      aria-label={t('common.delete')}
                      size="sm"
                      variant="ghost"
                      zIndex={2}
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
              {t('MeetingTemplatesModal.create')}
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
