import { Tag, TagProps } from '@chakra-ui/react'
import { TaskStatus } from '@shared/task'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { taskStatusColors } from '../molecules/TaskStatusInput'

interface Props extends TagProps {
  status: TaskStatus
}

export default function TaskStatusTag({ status, ...tagProps }: Props) {
  const { t } = useTranslation()
  return (
    <Tag colorScheme={taskStatusColors[status]} {...tagProps}>
      {t(`common.taskStatus.${status}`)}
    </Tag>
  )
}
