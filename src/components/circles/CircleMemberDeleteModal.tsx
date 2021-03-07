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
import { removeCircleMember } from '../../api/entities/circles'
import { useStoreState } from '../store/hooks'

interface Props
  extends Omit<Omit<AlertDialogProps, 'children'>, 'leastDestructiveRef'> {
  circleId: string
  memberId: string
  onDelete?(): void
}

export default function CircleMemberDeleteModal({
  circleId,
  memberId,
  onDelete,
  ...props
}: Props) {
  const getById = useStoreState((state) => state.circles.getById)
  const circle = useMemo(() => getById(circleId), [getById, circleId])

  const handleDelete = () => {
    removeCircleMember(memberId, circleId)
    onDelete?.()
    props.onClose()
  }

  if (!circle) return null

  return (
    <AlertDialog {...props} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer un membre d'un cercle
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Êtes-vous sûr de vouloir retirer ce membre de ce cercle ?
            </Text>
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
