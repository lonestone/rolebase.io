import { Icon, Tag } from '@chakra-ui/react'
import { MeetingFragment } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import React from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'

interface Props {
  meeting: MeetingFragment
}

export default function MeetingDate({ meeting }: Props) {
  const dateLocale = useDateLocale()

  return (
    <>
      <Tag h="26px">
        <Icon as={FiCalendar} mr={2} />
        {capitalizeFirstLetter(
          format(new Date(meeting.startDate), 'PPPP', {
            locale: dateLocale,
          })
        )}
      </Tag>
      <Tag h="26px">
        <Icon as={FiClock} mr={2} />
        {format(new Date(meeting.startDate), 'p', {
          locale: dateLocale,
        })}
        {' - '}
        {format(new Date(meeting.endDate), 'p', {
          locale: dateLocale,
        })}
      </Tag>
    </>
  )
}
