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
import { MeetingTemplateEntry } from '@shared/model/meeting_template'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { useSubscribeMeetingTemplatesSubscription } from 'src/graphql.generated'
import MeetingTemplateDeleteModal from './MeetingTemplateDeleteModal'
import MeetingTemplateEditModal from './MeetingTemplateEditModal'

export default function MeetingTemplateListModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()

  // Subscribe to templates
  const { data, loading, error } = useSubscribeMeetingTemplatesSubscription({
    skip: !orgId,
    variables: { orgId: orgId! },
  })
  const meetingTemplates = data?.meeting_template as
    | MeetingTemplateEntry[]
    | undefined

  // Create/Edit modal
  const [meetingTemplate, setMeetingTemplate] = useState<
    MeetingTemplateEntry | undefined
  >()
  const editModal = useDisclosure()

  // Delete modal
  const deleteModal = useDisclosure()

  const handleCreate = () => {
    setMeetingTemplate(undefined)
    editModal.onOpen()
  }

  const handleEdit = (mt: MeetingTemplateEntry) => {
    setMeetingTemplate(mt)
    editModal.onOpen()
  }

  const handleDelete = (mt: MeetingTemplateEntry) => {
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