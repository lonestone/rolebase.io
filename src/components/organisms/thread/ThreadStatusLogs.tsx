import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { useLastLogsSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import ThreadStatusLogItem from '@molecules/thread/ThreadStatusLogItem'
import { LogType } from '@shared/model/log'
import React, { useMemo } from 'react'

type ThreadStatusLogsProps = {
  threadId?: string
  hideEmpty?: boolean
}

export const ThreadStatusLogs = ({
  threadId,
  hideEmpty,
}: ThreadStatusLogsProps) => {
  const orgId = useOrgId()

  // Subscribe to logs
  const { data, error, loading } = useLastLogsSubscription({
    skip: !orgId,
    variables: { orgId: orgId! },
  })

  const logs = useMemo(
    () =>
      data?.log.filter((log) => {
        if (
          LogType.ThreadStatusUpdate.includes(log.display.type) &&
          log.display.id === threadId
        ) {
          return log
        }
      }),
    [data]
  )

  if (hideEmpty && logs?.length === 0) return null

  return (
    <>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {logs && <ThreadStatusLogItem log={logs[0]} />}
    </>
  )
}
