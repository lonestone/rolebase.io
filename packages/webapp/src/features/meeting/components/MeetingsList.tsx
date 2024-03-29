import DayLabel from '@/common/atoms/DayLabel'
import { Text } from '@chakra-ui/react'
import { MeetingSummaryFragment } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MeetingItem from './MeetingItem'

interface Props {
  meetings: MeetingSummaryFragment[]
  showCircle?: boolean
}

export default function MeetingsList({ meetings, showCircle }: Props) {
  const { t } = useTranslation()

  return (
    <>
      {meetings.length === 0 && (
        <Text fontStyle="italic" textAlign="center">
          {t('MeetingsList.empty')}
        </Text>
      )}

      {meetings.map((meeting, i) => (
        <React.Fragment key={meeting.id}>
          <DayLabel
            date={meeting.startDate}
            prevDate={meetings[i - 1]?.startDate}
            mt={i === 0 ? 0 : 4}
          />
          <MeetingItem
            meeting={meeting}
            showTime
            showCircle={showCircle}
            pl={2}
          />
        </React.Fragment>
      ))}
    </>
  )
}
