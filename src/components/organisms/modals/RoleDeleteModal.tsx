import { updateRole } from '@api/entities/roles'
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
import useCreateLog from '@hooks/useCreateLog'
import useRole from '@hooks/useRole'
import { EntityChangeType, LogType } from '@shared/log'
import React from 'react'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  id: string
  onDelete?(): void
}

export default function RoleDeleteModal({
  id,
  onDelete,
  ...alertProps
}: Props) {
  const role = useRole(id)
  const createLog = useCreateLog()

  const handleDelete = async () => {
    if (!role) return
    await updateRole(id, { archived: true })
    onDelete?.()
    alertProps.onClose()

    // Log change
    createLog({
      display: {
        type: LogType.RoleArchive,
        id,
        name: role.name,
      },
      changes: {
        roles: [
          {
            type: EntityChangeType.Update,
            id: role.id,
            prevData: { archived: false },
            newData: { archived: true },
          },
        ],
      },
    })
  }

  if (!role) return null

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer un rôle
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Êtes-vous sûr de vouloir supprimer le rôle{' '}
              <strong>{role.name}</strong> ?
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
