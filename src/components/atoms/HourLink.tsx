import { Link, LinkProps } from '@chakra-ui/react'
import { format } from 'date-fns'
import firebase from 'firebase'
import React, { useMemo } from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkProps {
  date?: Date
  timestamp?: firebase.firestore.Timestamp
}

export function HourLink({ date, timestamp, ...linkProps }: Props) {
  const computedDate = useMemo(
    () => date || timestamp?.toDate() || new Date(),
    [date, timestamp]
  )

  return (
    <Link
      as={ReachLink}
      to="#"
      color="gray.400"
      textDecoration="none"
      {...linkProps}
    >
      {format(computedDate, 'HH:mm')}
    </Link>
  )
}
