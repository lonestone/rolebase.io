import { deleteMeetingTemplate } from '@api/entities/meetingTemplates'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
} from '@chakra-ui/react'
import { MeetingTempalteEntry } from '@shared/meetingTemplate'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  meetingTemplate: MeetingTempalteEntry
  onDelete?(): void
}

export default function MeetingTemplateDeleteModal({
  meetingTemplate,
  onDelete,
  ...alertProps
}: Props) {
  const { t } = useTranslation()

  const handleDelete = () => {
    deleteMeetingTemplate(meetingTemplate.id)
    onDelete?.()
    alertProps.onClose()
  }

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('organisms.modals.MeetingTemplateDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Trans
              i18nKey="organisms.modals.MeetingTemplateDeleteModal.info"
              values={{ name: meetingTemplate.title }}
              components={{ b: <strong /> }}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={alertProps.onClose}>{t('common.cancel')}</Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              {t('common.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
