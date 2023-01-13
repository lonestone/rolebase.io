import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Text } from '@chakra-ui/react'
import { useSubscribeTaskSubscription } from '@gql'
import { useUserId } from '@nhost/react'
import { TaskEntry } from '@shared/model/task'
import { ActivityTask } from '@shared/model/thread_activity'
import { WithId } from '@shared/model/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import TaskItem from '../task/TaskItem'
import ThreadActivityLayout from './ThreadActivityLayout'

interface Props {
  activity: WithId<ActivityTask>
}

export default function ThreadActivityTask({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()

  // Edition
  const isUserOwner = userId === activity.userId

  const { data, loading, error } = useSubscribeTaskSubscription({
    variables: {
      id: activity.data.entityId,
    },
  })
  const task = data?.task_by_pk as TaskEntry | undefined

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500">{t(`ThreadActivityTask.text`)}</Text>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
      {task && <TaskItem task={task} showMember showIcon width="fit-content" />}
    </ThreadActivityLayout>
  )
}