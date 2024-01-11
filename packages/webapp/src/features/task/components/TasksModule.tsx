import { OverflowContainerParams } from '@/common/atoms/OverflowContainer'
import React, { ReactNode } from 'react'
import TasksContent from './TasksContent'
import TasksHeader, { TasksParams } from './TasksHeader'

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
