import { Link } from '@chakra-ui/react'
import { format } from 'date-fns'
import firebase from 'firebase'
import React, { useMemo } from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  date?: Date
  timestamp?: firebase.firestore.Timestamp
}

export function HourLink(props: Props) {
  const date = useMemo(
    () => props.date || props.timestamp?.toDate() || new Date(),
    [props.date, props.timestamp]
  )

  return (
    <Link as={ReachLink} to="#" ml={2} color="gray.400" textDecoration="none">
      {format(date, 'HH:mm')}
    </Link>
  )
}
