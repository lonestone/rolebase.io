import { Container } from '@chakra-ui/react'
import MeetingContent from '@components/organisms/MeetingContent'
import React from 'react'
import { useParams } from 'react-router-dom'
import Page404 from './Page404'

interface Params {
  meetingId: string
}

export default function MeetingPage() {
  const meetingId = useParams<Params>().meetingId

  if (!meetingId) {
    return <Page404 />
  }

  return (
    <Container maxW="3xl" mt="60px">
      <MeetingContent id={meetingId} />
    </Container>
  )
}
