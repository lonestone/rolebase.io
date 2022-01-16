import { deleteCircle } from '@api/entities/circles'
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

  const handleDelete = () => {
    deleteCircle(id)
    onDelete?.()
    alertProps.onClose()
    setTimeout(
      () => circleMemberContext?.goTo(circle?.parentId || undefined),
      1000
    )
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
