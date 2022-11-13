import { useToast } from '@chakra-ui/react'
import useCreateLog from '@hooks/useCreateLog'
import { EntityChangeType, LogType } from '@shared/model/log'
import { TaskEntry, TaskStatus } from '@shared/model/task'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateTaskMutation } from 'src/graphql.generated'

export default function useUpdateTaskStatus() {
  const { t } = useTranslation()
  const toast = useToast()
  const createLog = useCreateLog()
  const [updateTask] = useUpdateTaskMutation()

  // Toggle done status of a task
  return useCallback(
    async (task: TaskEntry, status: TaskStatus) => {
      await updateTask({ variables: { id: task.id, values: { status } } })

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
        title: t('useUpdateTaskStatus.toast', {
          status: t(`common.taskStatus.${status}`),
        }),
      })
    },
    [t]
  )
}
