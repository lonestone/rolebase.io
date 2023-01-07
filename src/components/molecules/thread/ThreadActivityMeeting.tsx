import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Text } from '@chakra-ui/react'
import { useSubscribeMeetingSubscription } from '@gql'
import { useUserId } from '@nhost/react'
import { MeetingEntry } from '@shared/model/meeting'
import { ActivityMeeting } from '@shared/model/thread_activity'
import { WithId } from '@shared/model/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MeetingItem from '../meeting/MeetingItem'
import ThreadActivityLayout from './ThreadActivityLayout'

interface Props {
  activity: WithId<ActivityMeeting>
}

export default function ThreadActivityMeeting({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()

  // Edition
  const isUserOwner = userId === activity.userId

  const { data, loading, error } = useSubscribeMeetingSubscription({
    variables: { id: activity.data.entityId },
  })
  const meeting = data?.meeting_by_pk as MeetingEntry | undefined

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500">{t(`ThreadActivityMeeting.text`)}</Text>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
      {meeting && <MeetingItem meeting={meeting} showDate showIcon />}
    </ThreadActivityLayout>
  )
}
