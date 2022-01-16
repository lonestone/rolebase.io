import { removeCircleMember } from '@api/entities/circles'
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
import useMember from '@hooks/useMember'
import React from 'react'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  circleId: string
  memberId: string
  onDelete?(): void
}

export default function CircleMemberDeleteModal({
  circleId,
  memberId,
  onDelete,
  ...alertProps
}: Props) {
  const circle = useCircle(circleId)
  const member = useMember(memberId)

  const handleDelete = () => {
    removeCircleMember(memberId, circleId)
    onDelete?.()
    alertProps.onClose()
  }

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer le rôle d'un membre
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Êtes-vous sûr de vouloir retirer le rôle{' '}
              <strong>{circle?.role.name}</strong> au membre{' '}
              <strong>{member?.name}</strong> ?
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
