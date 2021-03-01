import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { deleteMember, useMember } from '../../data/members'
import Loading from '../Loading'
import TextErrors from '../TextErrors'

interface Props {
  id: string
  isOpen: boolean
  onClose(): void
  onDelete(): void
}

export default function MemberDeleteModal({
  id,
  isOpen,
  onClose,
  onDelete,
  ...props
}: Props) {
  const [data, loading, error] = useMember(id)

  const handleDelete = () => {
    deleteMember(id)
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
            Supprimer membre
          </AlertDialogHeader>

          <AlertDialogBody>
            <Loading active={loading} />
            <TextErrors errors={[error]} />

            {data && (
              <Text>
                Êtes-vous sûr de vouloir supprimer le membre {data.name} ?
              </Text>
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
