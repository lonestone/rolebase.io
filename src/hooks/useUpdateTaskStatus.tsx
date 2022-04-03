import { updateTask } from '@api/entities/tasks'
import { useToast } from '@chakra-ui/react'
import { taskStatusTexts } from '@components/molecules/TaskStatusInput'
import useCreateLog from '@hooks/useCreateLog'
import { EntityChangeType, LogType } from '@shared/log'
import { TaskEntry, TaskStatus } from '@shared/task'
import { useCallback } from 'react'

export default function useUpdateTaskStatus() {
  const toast = useToast()
  const createLog = useCreateLog()

  // Toggle done status of a task
  return useCallback(async (task: TaskEntry, status: TaskStatus) => {
    await updateTask(task.id, { status })

    await createLog({
      display: {
        type: LogType.TaskStatusUpdate,
        id: task.id,
        name: task.title,
        status,
      },
      changes: {
        tasks: [
          {
            type: EntityChangeType.Update,
            id: task.id,
            prevData: { status: task.status },
            newData: { status },
          },
        ],
      },
    })

    // Toast to cancel
    toast({
      status: 'success',
      duration: 2000,
      title: `Tâche marquée comme "${taskStatusTexts[status]}"`,
    })
  }, [])
}
