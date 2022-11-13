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
import { MeetingTempalteEntry } from '@shared/model/meeting_template'
import React, { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useDeleteMeetingTemplateMutation } from 'src/graphql.generated'

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
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [deleteMeetingTemplate] = useDeleteMeetingTemplateMutation()

  const handleDelete = () => {
    deleteMeetingTemplate({ variables: { id: meetingTemplate.id } })
    onDelete?.()
    alertProps.onClose()
  }

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t('MeetingTemplateDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Trans
              i18nKey="MeetingTemplateDeleteModal.info"
              values={{ name: meetingTemplate.title }}
              components={{ b: <strong /> }}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={alertProps.onClose}>
              {t('common.cancel')}
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              {t('common.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
