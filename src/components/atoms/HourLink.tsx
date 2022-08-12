import { Link, LinkProps } from '@chakra-ui/react'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import React, { useMemo } from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkProps {
  activityId: string
  date?: Date
  timestamp?: Timestamp
}

export default function HourLink({
  activityId,
  date,
  timestamp,
  ...linkProps
}: Props) {
  const computedDate = useMemo(
    () => date || timestamp?.toDate() || new Date(),
    [date, timestamp]
  )

  return (
    <Link
      as={ReachLink}
      to={`#activity-${activityId}`}
      fontSize="sm"
      fontWeight="normal"
      color="gray.500"
      {...linkProps}
    >
      {format(computedDate, 'HH:mm')}
    </Link>
  )
}
