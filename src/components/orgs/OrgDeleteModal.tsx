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
import { updateOrg } from '../../api/entities/orgs'
import useOrg from '../../hooks/useOrg'

interface Props
  extends Omit<Omit<AlertDialogProps, 'children'>, 'leastDestructiveRef'> {
  id: string
  onDelete(): void
}

export default function OrgDeleteModal({ id, onDelete, ...props }: Props) {
  const org = useOrg(id)

  const handleDelete = () => {
    updateOrg(id, { archived: true })
    onDelete()
    props.onClose()
  }

  if (!org) return null

  return (
    <AlertDialog {...props} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer une organisation
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>Êtes-vous sûr de vouloir supprimer le rôle {org.name} ?</Text>
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
