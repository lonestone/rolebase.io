import { updateTask } from '@api/entities/tasks'
import { useToast } from '@chakra-ui/react'
import useCreateLog from '@hooks/useCreateLog'
import { EntityChangeType, LogType } from '@shared/log'
import { TaskEntry } from '@shared/task'
import { Timestamp } from 'firebase/firestore'
import { useCallback } from 'react'

export default function useUpdateTaskStatus() {
  const toast = useToast()
  const createLog = useCreateLog()

  // Toggle done status of a task
  return useCallback(async (task: TaskEntry, doneDate: Timestamp | null) => {
    await updateTask(task.id, { doneDate })

    await createLog({
      display: {
        type: LogType.TaskStatusUpdate,
        id: task.id,
        name: task.title,
        status: doneDate ? 'terminée' : 'non terminée',
      },
      changes: {
        tasks: [
          {
            type: EntityChangeType.Update,
            id: task.id,
            prevData: { doneDate: task.doneDate || null },
            newData: { doneDate },
          },
        ],
      },
    })

    // Toast to cancel
    toast({
      status: 'success',
      duration: 2000,
      title: doneDate
        ? 'Tâche marquée comme terminée'
        : 'Tâche marquée comme non terminée',
    })
  }, [])
}
