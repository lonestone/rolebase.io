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
import { deleteOrg } from '../../api/entities/orgs'
import { useStoreState } from '../store/hooks'

interface Props
  extends Omit<Omit<AlertDialogProps, 'children'>, 'leastDestructiveRef'> {
  id: string
  onDelete(): void
}

export default function OrgDeleteModal({ id, onDelete, ...props }: Props) {
  const getById = useStoreState((state) => state.orgs.getById)
  const org = useMemo(() => getById(id), [getById, id])

  const handleDelete = () => {
    deleteOrg(id)
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
