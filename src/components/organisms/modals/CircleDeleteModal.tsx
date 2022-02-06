import { archiveCircle } from '@api/entities/circles'
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
import useCircle from '@hooks/useCircle'
import useCreateLog from '@hooks/useCreateLog'
import { LogType } from '@shared/log'
import React, { useContext } from 'react'
import { CircleMemberContext } from 'src/contexts/CircleMemberContext'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  id: string
  onDelete?(): void
}

export default function CircleDeleteModal({
  id,
  onDelete,
  ...alertProps
}: Props) {
  const circleMemberContext = useContext(CircleMemberContext)
  const circle = useCircle(id)
  const createLog = useCreateLog()

  const handleDelete = async () => {
    if (!circle) return
    const changes = await archiveCircle(id)
    onDelete?.()
    alertProps.onClose()

    // Open circle page/panel after animation
    setTimeout(
      () => circleMemberContext?.goTo(circle?.parentId || undefined),
      1000
    )

    // Log change
    createLog({
      // meetingId:
      display: {
        type: LogType.CircleArchive,
        id: circle.id,
        name: circle.role.name,
      },
      changes,
    })
  }

  if (!circle) return null

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer un cercle
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Êtes-vous sûr de vouloir supprimer le cercle{' '}
              <strong>{circle.role.name}</strong> ?
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
