import { BoxProps } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { useOrgId } from '@hooks/useOrgId'
import { LogType } from '@shared/model/log'
import React, { ReactNode, useMemo } from 'react'
import { useSubscribeMeetingLogsSubscription } from 'src/graphql.generated'
import LogsList from './LogsList'

interface Props extends BoxProps {
  meetingId: string
  includeTypes?: LogType[]
  excludeTypes?: LogType[]
  hideEmpty?: boolean
  header?: ReactNode
}

export default function MeetingLogs({
  meetingId,
  includeTypes,
  excludeTypes,
  hideEmpty,
  header,
  ...boxProps
}: Props) {
  const orgId = useOrgId()

  // Subscribe to logs
  const { data, error, loading } = useSubscribeMeetingLogsSubscription({
    skip: !orgId,
    variables: { meetingId },
  })

  const logs = useMemo(
    () =>
      data?.log.filter((log) => {
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

  if (hideEmpty && logs?.length === 0) return null

  return (
    <>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {header}
      {logs && <LogsList logs={logs} {...boxProps} />}
    </>
  )
}
