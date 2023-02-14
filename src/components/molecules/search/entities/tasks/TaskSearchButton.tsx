import { TaskFragment, Task_Status_Enum } from '@gql'
import useCreateTask from '@hooks/useCreateTask'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import React, { useCallback } from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useTaskSearchItems } from './useTaskSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  tasks: TaskFragment[]
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
        status: Task_Status_Enum.Open,
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
