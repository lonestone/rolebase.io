import MeetingContent from '@organisms/meeting/MeetingContent'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Page404 from './Page404'

type Params = {
  meetingId: string
}

export default function MeetingPage() {
  const meetingId = useParams<Params>().meetingId
  const navigate = useNavigate()

  if (!meetingId) return <Page404 />

  return (
    <MeetingContent
      id={meetingId}
      changeTitle
      h="100%"
      onClose={() => navigate('..')}
    />
  )
}
