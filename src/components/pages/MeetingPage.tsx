import { Container } from '@chakra-ui/react'
import MeetingContent from '@components/organisms/MeetingContent'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Page404 from './Page404'

interface Params {
  meetingId: string
}

export default function MeetingPage() {
  const meetingId = useParams<Params>().meetingId
  const history = useHistory()

  if (!meetingId) {
    return <Page404 />
  }

  return (
    <Container maxW="3xl" mt={10}>
      <MeetingContent id={meetingId} onClose={() => history.push('.')} />
    </Container>
  )
}
