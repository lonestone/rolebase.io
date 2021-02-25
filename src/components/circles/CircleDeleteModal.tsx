import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { deleteCircle, useCircle } from '../../data/circles'
import TextError from '../TextError'

interface Props {
  id: string
  isOpen: boolean
  onClose(): void
  onDelete(): void
}

export default function CircleDeleteModal({
  id,
  isOpen,
  onClose,
  onDelete,
  ...props
}: Props) {
  const [data, loading, error] = useCircle(id)

  const handleDelete = () => {
    deleteCircle(id)
    onDelete()
    onClose()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={undefined}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer cercle
          </AlertDialogHeader>

          <AlertDialogBody>
            {error && <TextError error={error} />}
            {loading && <Spinner />}
            {data && (
              <Text>Êtes-vous sûr de vouloir supprimer ce cercle ?</Text>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Annuler</Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
