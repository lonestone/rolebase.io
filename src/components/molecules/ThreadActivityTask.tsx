import { subscribeTask } from '@api/entities/tasks'
import { Text } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivityLayout from '@components/molecules/ThreadActivityLayout'
import useSubscription from '@hooks/useSubscription'
import { ActivityTask } from '@shared/model/activity'
import { WithId } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import TaskItem from './TaskItem'

interface Props {
  activity: WithId<ActivityTask>
}

export default function ThreadActivityTask({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useStoreState((state) => state.auth.user?.id)

  // Edition
  const isUserOwner = userId === activity.userId

  const {
    data: task,
    loading,
    error,
  } = useSubscription(subscribeTask(activity.entityId))

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500">{t(`ThreadActivityTask.text`)}</Text>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
      {task && <TaskItem task={task} showMember showIcon width="fit-content" />}
    </ThreadActivityLayout>
  )
}
