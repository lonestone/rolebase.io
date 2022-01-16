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
  Text,
} from '@chakra-ui/react'
import { MeetingTempalteEntry } from '@shared/meetingTemplate'
import React from 'react'

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
            Supprimer un template de réunion
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Êtes-vous sûr de vouloir supprimer le template{' '}
              <strong>{meetingTemplate.title}</strong> ?
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={alertProps.onClose}>Annuler</Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
