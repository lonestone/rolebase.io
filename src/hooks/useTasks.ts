import {
  useCreateTaskViewMutation,
  useSubscribeTasksSubscription,
  useSubscribeTaskViewSubscription,
  useUpdateTaskViewMutation,
} from '@gql'
import { TaskEntry, TaskStatus, TasksViewTypes } from '@shared/model/task'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useOrgId } from './useOrgId'

export function useTasks(
  view: TasksViewTypes,
  filters?: {
    memberId?: string
    circleId?: string
    status?: TaskStatus
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
  } = useSubscribeTasksSubscription({
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
            : { _neq: TaskStatus.Done },
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
    useSubscribeTaskViewSubscription({
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
    TaskEntry | undefined
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
    }) as TaskEntry[]
  }, [tasks, tasksIdsCache, loading, tasksViewLoading])

  // Save new ordered list
  const [createTaskView] = useCreateTaskViewMutation()
  const [updateTaskView] = useUpdateTaskViewMutation()
  const changeOrder = useCallback(
    (tasksIds: string[], changedTask?: TaskEntry) => {
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
