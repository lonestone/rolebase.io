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
import React from 'react'
import { deleteCircle } from '../../api/entities/circles'
import useCircle from '../../hooks/useCircle'
import { useNavigateOrg } from '../../hooks/useNavigateOrg'

interface Props
  extends Omit<Omit<AlertDialogProps, 'children'>, 'leastDestructiveRef'> {
  id: string
  onDelete?(): void
}

export default function CircleDeleteModal({ id, onDelete, ...props }: Props) {
  const navigateOrg = useNavigateOrg()
  const circle = useCircle(id)

  const handleDelete = () => {
    deleteCircle(id)
    onDelete?.()
    props.onClose()
    setTimeout(
      () => navigateOrg(circle?.parentId ? `?circleId=${circle.parentId}` : ''),
      1000
    )
  }

  if (!circle) return null

  return (
    <AlertDialog {...props} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer un cercle
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>Êtes-vous sûr de vouloir supprimer ce cercle ?</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={props.onClose}>Annuler</Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
