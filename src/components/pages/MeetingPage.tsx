import { Container } from '@chakra-ui/react'
import MeetingContent from '@components/organisms/meeting/MeetingContent'
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
    <Container maxW="3xl" py={10}>
      <MeetingContent
        id={meetingId}
        changeTitle
        onClose={() => navigate('..')}
      />
    </Container>
  )
}
