import useCreateTask from '@hooks/useCreateTask'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { TaskEntry, TaskStatus } from '@shared/model/task'
import React, { useCallback } from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useTaskSearchItems } from './useTaskSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  tasks: TaskEntry[] // If not provided, use store
  excludeIds?: string[]
  createCircleId?: string
}

export default function TaskSearchButton({
  tasks,
  excludeIds,
  createCircleId,
  ...props
}: Props) {
  const items = useTaskSearchItems(tasks, excludeIds)
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const createTask = useCreateTask()

  const handleCreate = useCallback(
    async (title: string) => {
      if (!orgId || !createCircleId || !currentMember) {
        throw new Error()
      }

      // Create member
      const task = await createTask({
        orgId,
        title,
        circleId: createCircleId,
        memberId: currentMember.id,
        status: TaskStatus.Open,
      })
      return task?.id
    },
    [orgId, createCircleId, currentMember]
  )

  return (
    <SearchButton
      {...props}
      items={items}
      onCreate={createCircleId !== undefined ? handleCreate : undefined}
    />
  )
}
