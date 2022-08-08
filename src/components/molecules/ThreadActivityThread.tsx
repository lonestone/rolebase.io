import { subscribeThread } from '@api/entities/threads'
import { Text } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivityLayout from '@components/atoms/ThreadActivityLayout'
import useSubscription from '@hooks/useSubscription'
import { ActivityThread } from '@shared/model/activity'
import { WithId } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ThreadItem from './ThreadItem'

interface Props {
  activity: WithId<ActivityThread>
}

export default function ThreadActivityThread({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useStoreState((state) => state.auth.user?.id)

  // Edition
  const isUserOwner = userId === activity.userId

  const {
    data: thread,
    loading,
    error,
  } = useSubscription(subscribeThread(activity.entityId))

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500">{t(`ThreadActivityThread.text`)}</Text>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
      {thread && <ThreadItem thread={thread} showIcon />}
    </ThreadActivityLayout>
  )
}
