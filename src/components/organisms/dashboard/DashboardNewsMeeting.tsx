import { ExpandableText } from '@atoms/ExpandableText'
import Markdown from '@atoms/Markdown'
import { LinkBoxProps } from '@chakra-ui/react'
import { MeetingFragment } from '@gql'
import MeetingItem from '@molecules/meeting/MeetingItem'
import React from 'react'
import { PiUsersThreeFill } from 'react-icons/pi'
import DashboardNewsItemLayout from './DashboardNewsItemLayout'

interface Props extends LinkBoxProps {
  meeting: MeetingFragment
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
        fontWeight="medium"
        my={3}
      />

      {meeting.summary && (
        <ExpandableText p={2} pt={0} noOfLines={4}>
          <Markdown>{meeting.summary}</Markdown>
        </ExpandableText>
      )}
    </DashboardNewsItemLayout>
  )
}
