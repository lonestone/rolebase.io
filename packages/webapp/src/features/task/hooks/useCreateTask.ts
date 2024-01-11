import useCreateLog from '@/log/hooks/useCreateLog'
import { useOrgId } from '@/org/hooks/useOrgId'
import { useToast } from '@chakra-ui/react'
import {
  Task_Insert_Input,
  Task_Status_Enum,
  useCreateTaskMutation,
} from '@gql'
import { EntityChangeType, LogType } from '@shared/model/log'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export default function useCreateTask() {
  const { t } = useTranslation()
  const toast = useToast()
  const createLog = useCreateLog()
  const orgId = useOrgId()
  const [createTask] = useCreateTaskMutation()

  return useCallback(
    async (task: Task_Insert_Input) => {
      // Create task
      const { data: newTaskData } = await createTask({
        variables: {
          values: {
            orgId,
            status: Task_Status_Enum.Open,
            ...task,
          },
        },
      })
      const newTask = newTaskData?.insert_task_one

      if (!newTask) return

      // Record log
      createLog({
        taskId: newTask.id,
        display: {
          type: LogType.TaskCreate,
          id: newTask.id,
          name: newTask.title,
        },
        changes: {
          tasks: [
            { type: EntityChangeType.Create, id: newTask.id, data: newTask },
          ],
        },
      })

      // Toast
      toast({
        status: 'success',
        duration: 2000,
        title: t('useCreateTask.toast'),
      })

      return newTask
    },
    [t, orgId]
  )
}
