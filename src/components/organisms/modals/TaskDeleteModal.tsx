import { updateTask } from '@api/entities/tasks'
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
import { EntityChangeType, LogType } from '@shared/log'
import { TaskEntry } from '@shared/task'
import React from 'react'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  task: TaskEntry
  onDelete?(): void
}

export default function TaskDeleteModal({
  task,
  onDelete,
  ...alertProps
}: Props) {
  const createLog = useCreateLog()
  const handleDelete = async () => {
    updateTask(task.id, { archived: true })
    onDelete?.()
    createLog({
      display: {
        type: LogType.TaskArchive,
        id: task.id,
        name: task.title,
      },
      changes: {
        tasks: [
          {
            type: EntityChangeType.Update,
            id: task.id,
            prevData: { archived: false },
            newData: { archived: false },
          },
        ],
      },
    })
    alertProps.onClose()
  }

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer une tâche
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Êtes-vous sûr de vouloir supprimer la tâche{' '}
              <strong>{task.title}</strong> ?
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
