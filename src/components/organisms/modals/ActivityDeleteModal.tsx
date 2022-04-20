import { deleteActivity } from '@api/entities/activities'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Box,
  Button,
  Text,
} from '@chakra-ui/react'
import ThreadActivity from '@components/molecules/ThreadActivity'
import { ActivityEntry } from '@shared/activity'
import React from 'react'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  activity: ActivityEntry
  onDelete?(): void
}

export default function ActivityDeleteModal({
  activity,
  onDelete,
  ...alertProps
}: Props) {
  const handleDelete = () => {
    deleteActivity(activity.id)
    onDelete?.()
    alertProps.onClose()
  }

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer un message
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Êtes-vous sûr de vouloir supprimer ce message ?<br />
              Pas d'annulation possible !
            </Text>

            <Box
              mt={3}
              border="1px solid"
              borderColor="gray.500"
              borderRadius="md"
              overflow="hidden"
            >
              <ThreadActivity activity={activity} />
            </Box>
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
