import useOverflowHidden from '@hooks/useOverflowHidden'
import MeetingContainer from '@organisms/meeting/MeetingContainer'
import React from 'react'
import { useParams } from 'react-router-dom'
import Page404 from './Page404'

type Params = {
  meetingId: string
}

export default function MeetingPage() {
  const meetingId = useParams<Params>().meetingId

  // Hide overflow to avoid editor cursor to overflow
  useOverflowHidden()

  if (!meetingId) return <Page404 />

  return <MeetingContainer id={meetingId} changeTitle />
}
