import { subscribeMeeting } from '@api/entities/meetings'
import { Text } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivityLayout from '@components/molecules/ThreadActivityLayout'
import useSubscription from '@hooks/useSubscription'
import { ActivityMeeting } from '@shared/model/activity'
import { WithId } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MeetingItem from './MeetingItem'

interface Props {
  activity: WithId<ActivityMeeting>
}

export default function ThreadActivityMeeting({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useStoreState((state) => state.auth.user?.id)

  // Edition
  const isUserOwner = userId === activity.userId

  const {
    data: meeting,
    loading,
    error,
  } = useSubscription(subscribeMeeting(activity.entityId))

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500">{t(`ThreadActivityMeeting.text`)}</Text>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
      {meeting && <MeetingItem meeting={meeting} showDate showTime showIcon />}
    </ThreadActivityLayout>
  )
}
