import { updateMember } from '@api/entities/members'
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
import useMember from '@hooks/useMember'
import { EntityChangeType, LogType } from '@shared/log'
import React from 'react'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  id: string
  onDelete?(): void
}

export default function MemberDeleteModal({
  id,
  onDelete,
  ...alertProps
}: Props) {
  const member = useMember(id)
  const createLog = useCreateLog()

  const handleDelete = async () => {
    if (!member) return
    await updateMember(id, { archived: true })
    onDelete?.()
    alertProps.onClose()

    // Log change
    createLog({
      display: {
        type: LogType.MemberArchive,
        id,
        name: member.name,
      },
      changes: {
        members: [
          {
            type: EntityChangeType.Update,
            id: member.id,
            prevData: { archived: false },
            newData: { archived: true },
          },
        ],
      },
    })
  }

  if (!member) return null

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer un membre
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Êtes-vous sûr de vouloir supprimer le membre{' '}
              <strong>{member.name}</strong> ?
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
