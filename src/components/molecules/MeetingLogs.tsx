import { subscribeLogsByMeeting } from '@api/entities/logs'
import { BoxProps } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import { LogType } from '@shared/model/log'
import React, { useMemo } from 'react'
import LogsList from './LogsList'

interface Props extends BoxProps {
  meetingId: string
  includeTypes?: LogType[]
  excludeTypes?: LogType[]
  hideEmpty?: boolean
}

export default function MeetingLogs({
  meetingId,
  includeTypes,
  excludeTypes,
  hideEmpty,
  ...boxProps
}: Props) {
  const orgId = useOrgId()

  const subscribeLogs = orgId
    ? subscribeLogsByMeeting(orgId, meetingId)
    : undefined

  const { data, loading, error } = useSubscription(subscribeLogs)

  const logs = useMemo(
    () =>
      data?.filter((log) => {
        if (includeTypes && !includeTypes.includes(log.display.type)) {
          return false
        }
        if (excludeTypes && excludeTypes.includes(log.display.type)) {
          return false
        }
        return true
      }),
    [data, includeTypes, excludeTypes]
  )

  return (
    <>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {logs && <LogsList logs={logs} hideEmpty={hideEmpty} {...boxProps} />}
    </>
  )
}
