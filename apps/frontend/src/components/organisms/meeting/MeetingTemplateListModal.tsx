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
import { MeetingTemplateFragment, useMeetingTemplatesSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import ListItemWithButtons from '@molecules/ListItemWithButtons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import MeetingTemplateDeleteModal from './MeetingTemplateDeleteModal'
import MeetingTemplateEditModal from './MeetingTemplateEditModal'

export default function MeetingTemplateListModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()

  // Subscribe to templates
  const { data, loading, error } = useMeetingTemplatesSubscription({
    skip: !orgId,
    variables: { orgId: orgId! },
  })
  const meetingTemplates = data?.meeting_template

  // Create/Edit modal
  const [meetingTemplate, setMeetingTemplate] = useState<
    MeetingTemplateFragment | undefined
  >()
  const editModal = useDisclosure()

  // Delete modal
  const deleteModal = useDisclosure()

  const handleCreate = () => {
    setMeetingTemplate(undefined)
    editModal.onOpen()
  }

  const handleEdit = (mt: MeetingTemplateFragment) => {
    setMeetingTemplate(mt)
    editModal.onOpen()
  }

  const handleDelete = (mt: MeetingTemplateFragment) => {
    setMeetingTemplate(mt)
    deleteModal.onOpen()
  }

  return (
    <>
      <Modal {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('MeetingTemplateListModal.heading')}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {loading && <Loading active size="md" />}
            <TextErrors errors={[error]} />

            {!loading && !meetingTemplates?.length ? (
              <Text fontStyle="italic">
                {t('MeetingTemplateListModal.empty')}
              </Text>
            ) : (
              meetingTemplates?.map((mt) => (
                <ListItemWithButtons
                  key={mt.id}
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
                >
                  {mt.title}
                </ListItemWithButtons>
              ))
            )}
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button leftIcon={<FiPlus />} onClick={handleCreate}>
              {t('MeetingTemplateListModal.create')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {editModal.isOpen && (
        <MeetingTemplateEditModal
          meetingTemplate={meetingTemplate}
          isOpen
          onClose={editModal.onClose}
        />
      )}

      {deleteModal.isOpen && meetingTemplate && (
        <MeetingTemplateDeleteModal
          meetingTemplate={meetingTemplate}
          isOpen
          onClose={deleteModal.onClose}
        />
      )}
    </>
  )
}
