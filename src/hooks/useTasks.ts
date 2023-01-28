import {
  TaskFragment,
  Task_Status_Enum,
  useCreateTaskViewMutation,
  useTasksSubscription,
  useTaskViewSubscription,
  useUpdateTaskViewMutation,
} from '@gql'
import { TasksViewTypes } from '@shared/model/task'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useOrgId } from './useOrgId'

export function useTasks(
  view: TasksViewTypes,
  filters?: {
    memberId?: string
    circleId?: string
    status?: Task_Status_Enum
    archived?: boolean
  }
) {
  const orgId = useOrgId()

  const key = `${view}-${filters?.memberId || ''}-${filters?.circleId || ''}-${
    filters?.status || ''
  }`

  // Subscribe to tasks
  const {
    data: tasksData,
    error,
    loading,
  } = useTasksSubscription({
    skip: !orgId,
    variables: {
      filters: [
        { orgId: { _eq: orgId } },
        {
          archived: {
            _eq: filters?.archived === undefined ? false : filters.archived,
          },
        },
        {
          status: filters?.status
            ? { _eq: filters?.status }
            : { _neq: Task_Status_Enum.Done },
        },
        ...(filters?.circleId
          ? [{ circleId: { _eq: filters?.circleId } }]
          : []),
        ...(filters?.memberId
          ? [{ memberId: { _eq: filters?.memberId } }]
          : []),
      ],
    },
  })
  const tasks = tasksData?.task

  // Subscribe to tasks view to get tasks order
  const { data: tasksViewData, loading: tasksViewLoading } =
    useTaskViewSubscription({
      skip: !orgId,
      variables: {
        orgId: orgId!,
        key,
      },
    })
  const tasksView = tasksViewData?.task_view[0]

  // Keep last changed order and changed task until tasks view is updated
  // to avoid glitch after drag and drop
  const [tasksIdsCache, setTasksIdsCache] = useState<string[]>([])
  const [changedTaskCache, setChangedTaskCache] = useState<
    TaskFragment | undefined
  >()

  useEffect(() => {
    if (!tasksView) return
    setTasksIdsCache(tasksView.tasksIds)
  }, [tasksView])

  useEffect(() => {
    if (!tasksView) return
    setChangedTaskCache(undefined)
  }, [tasks])

  // Sort tasks according to view
  const sortedTasks = useMemo(() => {
    if (!tasks || loading || tasksViewLoading) return []
    const newTasks = [...tasks]

    // Replace changed task
    if (changedTaskCache) {
      const index = newTasks.findIndex(
        (task) => task.id === changedTaskCache.id
      )
      if (index !== -1) {
        newTasks[index] = changedTaskCache
      }
    }

    return newTasks.sort((a, b) => {
      const aIndex = tasksIdsCache.indexOf(a.id)
      const bIndex = tasksIdsCache.indexOf(b.id)
      return aIndex - bIndex
    })
  }, [tasks, tasksIdsCache, loading, tasksViewLoading])

  // Save new ordered list
  const [createTaskView] = useCreateTaskViewMutation()
  const [updateTaskView] = useUpdateTaskViewMutation()
  const changeOrder = useCallback(
    (tasksIds: string[], changedTask?: TaskFragment) => {
      if (!orgId) return
      setTasksIdsCache(tasksIds)
      if (changedTask) {
        setChangedTaskCache(changedTask)
      }
      if (tasksView) {
        updateTaskView({ variables: { orgId, key, tasksIds } })
      } else {
        createTaskView({ variables: { orgId, key, tasksIds } })
      }
    },
    [orgId, key, tasksView]
  )

  return {
    tasks: sortedTasks,
    loading: loading || tasksViewLoading,
    error,
    changeOrder,
  }
}
