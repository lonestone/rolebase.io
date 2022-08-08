import { Tag, TagProps } from '@chakra-ui/react'
import { TaskStatus } from '@shared/model/task'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends TagProps {
  status: TaskStatus
}

export const taskStatusColors: Record<TaskStatus, string> = {
  [TaskStatus.Open]: 'gray',
  [TaskStatus.InProgress]: 'blue',
  [TaskStatus.InReview]: 'yellow',
  [TaskStatus.Blocked]: 'red',
  [TaskStatus.Done]: 'green',
}

export default function TaskStatusTag({ status, ...tagProps }: Props) {
  const { t } = useTranslation()
  return (
    <Tag colorScheme={taskStatusColors[status]} {...tagProps}>
      {t(`common.taskStatus.${status}`)}
    </Tag>
  )
}
