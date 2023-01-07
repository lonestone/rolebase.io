import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Text } from '@chakra-ui/react'
import { useSubscribeThreadSubscription } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import { useUserId } from '@nhost/react'
import { ThreadEntry } from '@shared/model/thread'
import { ActivityThread } from '@shared/model/thread_activity'
import { WithId } from '@shared/model/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ThreadActivityLayout from './ThreadActivityLayout'
import ThreadItem from './ThreadItem'

interface Props {
  activity: WithId<ActivityThread>
}

export default function ThreadActivityThread({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()
  const currentMember = useCurrentMember()

  // Edition
  const isUserOwner = userId === activity.userId

  const { data, loading, error } = useSubscribeThreadSubscription({
    skip: !currentMember,
    variables: { id: activity.data.entityId, memberId: currentMember?.id! },
  })
  const thread = data?.thread_by_pk as ThreadEntry

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500">{t(`ThreadActivityThread.text`)}</Text>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
      {thread && <ThreadItem thread={thread} showIcon />}
    </ThreadActivityLayout>
  )
}
