import { Flex, Icon } from '@chakra-ui/react'
import { MeetingFragment } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import React from 'react'
import { FiClock } from 'react-icons/fi'

interface Props {
  meeting: MeetingFragment
}

export default function MeetingDate({ meeting }: Props) {
  const dateLocale = useDateLocale()

  return (
    <Flex align="center">
      {capitalizeFirstLetter(
        format(new Date(meeting.startDate), 'PPPP', {
          locale: dateLocale,
        })
      )}
      <Icon as={FiClock} mx={2} />
      {format(new Date(meeting.startDate), 'p', {
        locale: dateLocale,
      })}
      {' - '}
      {format(new Date(meeting.endDate), 'p', {
        locale: dateLocale,
      })}
    </Flex>
  )
}
