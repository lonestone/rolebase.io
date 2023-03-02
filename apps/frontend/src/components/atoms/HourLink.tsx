import { Link, LinkProps } from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useMemo } from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkProps {
  activityId: string
  date: Date | string
}

export default function HourLink({ activityId, date, ...linkProps }: Props) {
  const dateMemo = useMemo(
    () => (typeof date === 'string' ? new Date(date) : date),
    [date]
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
      {format(dateMemo, 'HH:mm')}
    </Link>
  )
}
