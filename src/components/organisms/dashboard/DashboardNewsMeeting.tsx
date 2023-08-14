import { LinkBoxProps } from '@chakra-ui/react'
import { MeetingSummaryFragment } from '@gql'
import MeetingItem from '@molecules/meeting/MeetingItem'
import React from 'react'
import { PiUsersThreeFill } from 'react-icons/pi'
import DashboardNewsItemLayout from './DashboardNewsItemLayout'

interface Props extends LinkBoxProps {
  meeting: MeetingSummaryFragment
}

export default function DashboardNewsMeeting({ meeting }: Props) {
  return (
    <DashboardNewsItemLayout
      i18nKey="DashboardNewsMeeting.action"
      date={meeting.endDate}
      icon={PiUsersThreeFill}
    >
      <MeetingItem
        meeting={meeting}
        showCircle
        showIcon
        fontWeight="bold"
        my={3}
      />
    </DashboardNewsItemLayout>
  )
}
