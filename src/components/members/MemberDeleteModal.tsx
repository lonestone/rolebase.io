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
import { deleteMember, useMember } from '../../data/members'
import Loading from '../common/Loading'
import TextErrors from '../common/TextErrors'

interface Props
  extends Omit<Omit<AlertDialogProps, 'children'>, 'leastDestructiveRef'> {
  id: string
  onDelete(): void
}

export default function MemberDeleteModal({
  id,

  onDelete,
  ...props
}: Props) {
  const [data, loading, error] = useMember(id)

  const handleDelete = () => {
    deleteMember(id)
    onDelete()
    props.onClose()
  }

  return (
    <AlertDialog {...props} leastDestructiveRef={undefined}>
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
