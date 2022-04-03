import { subscribeLogsByMeeting } from '@api/entities/logs'
import { Heading } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import LogsList from './LogsList'

interface Props {
  meetingId: string
}

export default function MeetingLogs({ meetingId }: Props) {
  const orgId = useOrgId()

  const subscribeLogs = orgId
    ? subscribeLogsByMeeting(orgId, meetingId)
    : undefined

  const { data, loading, error } = useSubscription(subscribeLogs)

  return (
    <>
      <Heading as="h3" size="sm" mb={2}>
        Actions pendant la réunion
      </Heading>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {data && <LogsList logs={data} />}
    </>
  )
}
