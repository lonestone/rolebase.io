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
import { deleteRole, useContextRole } from '../../api/entities/roles'
import Loading from '../common/Loading'
import TextErrors from '../common/TextErrors'

interface Props
  extends Omit<Omit<AlertDialogProps, 'children'>, 'leastDestructiveRef'> {
  circleId: string
  onDelete(): void
}

export default function RoleDeleteModal({
  circleId: id,
  onDelete,
  ...props
}: Props) {
  const [data, loading, error] = useContextRole(id)

  const handleDelete = () => {
    deleteRole(id)
    onDelete()
    props.onClose()
  }

  return (
    <AlertDialog {...props} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer rôle
          </AlertDialogHeader>

          <AlertDialogBody>
            <Loading active={loading} />
            <TextErrors errors={[error]} />

            {data && (
              <Text>
                Êtes-vous sûr de vouloir supprimer le rôle {data.name} ?
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
