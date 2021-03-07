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
import React, { useMemo } from 'react'
import { deleteCircle } from '../../api/entities/circles'
import { useStoreState } from '../store/hooks'

interface Props
  extends Omit<Omit<AlertDialogProps, 'children'>, 'leastDestructiveRef'> {
  id: string
  onDelete(): void
}

export default function CircleDeleteModal({ id, onDelete, ...props }: Props) {
  const getById = useStoreState((state) => state.circles.getById)
  const circle = useMemo(() => getById(id), [getById, id])

  const handleDelete = () => {
    deleteCircle(id)
    onDelete()
    props.onClose()
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
