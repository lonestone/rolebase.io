import { useToast } from '@chakra-ui/react'
import { useUpdateTaskMutation } from '@gql'
import useCreateLog from '@hooks/useCreateLog'
import { EntityChangeType, LogType } from '@shared/model/log'
import { TaskEntry, TaskStatus } from '@shared/model/task'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export default function useUpdateTaskStatus() {
  const { t } = useTranslation()
  const toast = useToast()
  const createLog = useCreateLog()
  const [updateTask] = useUpdateTaskMutation()

  // Toggle done status of a task
  return useCallback(
    async (task: TaskEntry, status: TaskStatus) => {
      // Update task
      await updateTask({ variables: { id: task.id, values: { status } } })

      // Record log
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

      // Toast
      toast({
        status: 'success',
        duration: 2000,
        title: t('useUpdateTaskStatus.toast', {
          status: t(`common.taskStatus.${status}`),
        }),
      })
    },
    [t]
  )
}
