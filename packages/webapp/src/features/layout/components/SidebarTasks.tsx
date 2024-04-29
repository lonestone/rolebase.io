import useCurrentMember from '@/member/hooks/useCurrentMember'
import TasksList from '@/task/components/TasksList'
import { useTasks } from '@/task/hooks/useTasks'
import { TasksViewTypes } from '@rolebase/shared/model/task'
import React from 'react'
import { sidebarSubItemProps } from './SidebarItem'
import SidebarItemsContainer from './SidebarItemsContainer'

export default function SidebarTasks() {
  const member = useCurrentMember()

  const { tasks, loading, changeOrder } = useTasks(TasksViewTypes.List, {
    memberId: member?.id,
  })

  // Don't show card if empty or loading
  const hasItems = !!(!loading && tasks?.length)

  return (
    <SidebarItemsContainer hasItems={hasItems}>
      <TasksList
        tasks={tasks}
        onOrderChange={changeOrder}
        noModal
        itemProps={sidebarSubItemProps}
      />
    </SidebarItemsContainer>
  )
}
