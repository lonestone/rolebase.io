import { Text } from '@chakra-ui/react'
import { useUserId } from '@nhost/react'
import { ThreadActivityMeetingFragment } from '@shared/model/thread_activity'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MeetingItem from '../meeting/MeetingItem'
import ThreadActivityLayout from './ThreadActivityLayout'

interface Props {
  activity: ThreadActivityMeetingFragment
}

export default function ThreadActivityMeeting({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()

  // Edition
  const isUserOwner = userId === activity.userId

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500" _dark={{ color: 'gray.300' }}>
        {t(`ThreadActivityMeeting.text`)}
      </Text>
      {activity.refMeeting && (
        <MeetingItem meeting={activity.refMeeting} showDate showIcon />
      )}
    </ThreadActivityLayout>
  )
}
