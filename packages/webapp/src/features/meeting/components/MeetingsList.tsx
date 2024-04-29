import DayLabel from '@/common/atoms/DayLabel'
import { BoxProps, Text } from '@chakra-ui/react'
import { MeetingSummaryFragment } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MeetingItem from './MeetingItem'

interface Props {
  meetings: MeetingSummaryFragment[]
  noModal?: boolean
  showCircle?: boolean
  itemProps?: BoxProps
  dayLabelProps?: BoxProps
}

export default function MeetingsList({
  meetings,
  noModal,
  showCircle,
  itemProps,
  dayLabelProps,
}: Props) {
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
            {...dayLabelProps}
          />
          <MeetingItem
            meeting={meeting}
            noModal={noModal}
            showTime
            showCircle={showCircle}
            pl={2}
            {...itemProps}
          />
        </React.Fragment>
      ))}
    </>
  )
}
