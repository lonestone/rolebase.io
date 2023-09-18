import { OverflowContainerParams } from '@atoms/OverflowContainer'
import TasksContent from '@molecules/task/TasksContent'
import TasksHeader, { TasksParams } from '@molecules/task/TasksHeader'
import React, { ReactNode } from 'react'

interface Props extends TasksParams {
  header?: ReactNode
  overflowContainer?: OverflowContainerParams
}

export default function TasksModule({
  header,
  overflowContainer,
  ...params
}: Props) {
  return (
    <>
      <TasksHeader {...params} title={header} pb={5} />
      <TasksContent {...params} overflowContainer={overflowContainer} />
    </>
  )
}
