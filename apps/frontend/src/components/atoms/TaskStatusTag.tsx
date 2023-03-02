import { Tag, TagProps } from '@chakra-ui/react'
import { Task_Status_Enum } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends TagProps {
  status: Task_Status_Enum
}

export const taskStatusColors: Record<Task_Status_Enum, string> = {
  [Task_Status_Enum.Open]: 'gray',
  [Task_Status_Enum.InProgress]: 'blue',
  [Task_Status_Enum.InReview]: 'yellow',
  [Task_Status_Enum.Blocked]: 'red',
  [Task_Status_Enum.Done]: 'green',
}

export default function TaskStatusTag({ status, ...tagProps }: Props) {
  const { t } = useTranslation()
  return (
    <Tag colorScheme={taskStatusColors[status]} {...tagProps}>
      {t(`common.taskStatus.${status}`)}
    </Tag>
  )
}
